import { CompanyType } from './companyType.enum';
import { InvalidCompanyDataException } from './InvalidCompanyData.exception';
import { CompanyValidations } from './CompanyValidations';

describe('CompanyValidations', () => {
  let validations: CompanyValidations;

  beforeEach(() => {
    validations = new CompanyValidations();
  });

  it('accepts valid mandatory strings', () => {
    expect(() =>
      validations.validateMandatoryStrings(
        'Valid Legal Name',
        'Valid Business Name',
        '12345678901',
        'valid@email.com',
      ),
    ).not.toThrow();
  });

  it('throws when legalName is missing', () => {
    expect(() =>
      validations.validateMandatoryStrings(
        '',
        'Valid Business Name',
        '12345678901',
        'valid@email.com',
      ),
    ).toThrow(new InvalidCompanyDataException('legalName is required'));
  });

  it('throws when businessName is too short', () => {
    expect(() =>
      validations.validateMandatoryStrings(
        'Valid Legal Name',
        'A',
        '12345678901',
        'valid@email.com',
      ),
    ).toThrow(
      new InvalidCompanyDataException(
        'businessName must be between 2 and 80 characters',
      ),
    );
  });

  it('throws when taxId has invalid characters', () => {
    expect(() =>
      validations.validateMandatoryStrings(
        'Valid Legal Name',
        'Valid Business Name',
        '1234567890A',
        'valid@email.com',
      ),
    ).toThrow(
      new InvalidCompanyDataException(
        'taxId can only include numbers and dashes',
      ),
    );
  });

  it('throws when email is invalid', () => {
    expect(() =>
      validations.validateMandatoryStrings(
        'Valid Legal Name',
        'Valid Business Name',
        '12345678901',
        'invalid-email',
      ),
    ).toThrow(
      new InvalidCompanyDataException('contactEmail is not a valid email'),
    );
  });

  it('throws when adhesionDate is in the future', () => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);

    expect(() => validations.validateAdhesionDate(tomorrow)).toThrow(
      new InvalidCompanyDataException('adhesionDate cannot be in the future'),
    );
  });

  it('throws when adhesionDate is invalid', () => {
    const invalidDate = new Date('invalid');

    expect(() => validations.validateAdhesionDate(invalidDate)).toThrow(
      new InvalidCompanyDataException('adhesionDate must be a valid date'),
    );
  });

  it('allows undefined or null lastTransferDate', () => {
    expect(() => validations.validateOptionalDates(undefined)).not.toThrow();
    expect(() => validations.validateOptionalDates(null)).not.toThrow();
  });

  it('throws when lastTransferDate is invalid', () => {
    const invalidDate = new Date('invalid');

    expect(() => validations.validateOptionalDates(invalidDate)).toThrow(
      new InvalidCompanyDataException('lastTransferDate must be a valid date'),
    );
  });

  it('throws when company type is invalid', () => {
    expect(() =>
      validations.validateCompanyType('INVALID' as CompanyType),
    ).toThrow(new InvalidCompanyDataException('type is not valid'));
  });
});
