import { CompanyType } from './companyType.enum';
import { InvalidCompanyDataException } from './InvalidCompanyData.exception';

export class CompanyValidations {
  constructor() {}

  validateMandatoryStrings(
    legalName: string,
    businessName: string,
    taxId: string,
    contactEmail: string,
  ) {
    this.ensureStringLength(legalName, 'legalName', 2, 150);
    this.ensureStringLength(businessName, 'businessName', 2, 80);
    this.ensureTaxId(taxId);
    this.ensureEmail(contactEmail);
  }

  validateAdhesionDate(date: Date) {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
      throw new InvalidCompanyDataException(
        'adhesionDate must be a valid date',
      );
    }

    const today = new Date();

    if (date.getTime() > today.getTime()) {
      throw new InvalidCompanyDataException(
        'adhesionDate cannot be in the future',
      );
    }
  }

  validateOptionalDates(lastTransferDate?: Date | null) {
    if (!lastTransferDate) {
      return;
    }

    if (
      !(lastTransferDate instanceof Date) ||
      Number.isNaN(lastTransferDate.getTime())
    ) {
      throw new InvalidCompanyDataException(
        'lastTransferDate must be a valid date',
      );
    }
  }

  validateCompanyType(type: CompanyType) {
    const validTypes = Object.values(CompanyType);

    if (!validTypes.includes(type)) {
      throw new InvalidCompanyDataException('type is not valid');
    }
  }

  private ensureStringLength(
    value: string,
    field: string,
    min: number,
    max: number,
  ) {
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new InvalidCompanyDataException(`${field} is required`);
    }

    const length = value.trim().length;

    if (length < min || length > max) {
      throw new InvalidCompanyDataException(
        `${field} must be between ${min} and ${max} characters`,
      );
    }
  }

  private ensureTaxId(value: string) {
    this.ensureStringLength(value, 'taxId', 11, 20);

    const formatted = value.trim();
    const taxIdPattern = /^[0-9-]+$/;

    if (!taxIdPattern.test(formatted)) {
      throw new InvalidCompanyDataException(
        'taxId can only include numbers and dashes',
      );
    }
  }

  private ensureEmail(value: string) {
    this.ensureStringLength(value, 'contactEmail', 5, 254);
    const emailPattern =
      /^(?:[a-zA-Z0-9_'^&+/=?`{|}~-]+(?:\.[a-zA-Z0-9_'^&+/=?`{|}~-]+)*|"(?:[\"]|\\\")+")@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

    if (!emailPattern.test(value.trim())) {
      throw new InvalidCompanyDataException(
        'contactEmail is not a valid email',
      );
    }
  }
}
