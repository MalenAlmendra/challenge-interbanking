import { Company } from './Company';
import { CompanyType } from './companyType.enum';
import { InvalidCompanyDataException } from './InvalidCompanyData.exception';

describe('Company', () => {
  const baseData = {
    legalName: '  Legal Name  ',
    businessName: ' Business Name ',
    taxId: '12345678901',
    type: CompanyType.PYME,
    adhesionDate: new Date('2024-01-01'),
    isActive: true,
    contactEmail: ' email@example.com ',
  };

  it('trims string fields and sets optional defaults', () => {
    const company = new Company(
      baseData.legalName,
      baseData.businessName,
      baseData.taxId,
      baseData.type,
      baseData.adhesionDate,
      baseData.isActive,
      baseData.contactEmail,
      undefined,
      undefined,
      undefined,
      undefined,
    );

    expect(company.legalName).toBe('Legal Name');
    expect(company.businessName).toBe('Business Name');
    expect(company.taxId).toBe('12345678901');
    expect(company.contactEmail).toBe('email@example.com');
    expect(company.contactPhone).toBe('');
    expect(company.address).toBe('');
    expect(company.lastTransferDate).toBeNull();
  });

  it('keeps optional values when provided', () => {
    const lastTransferDate = new Date('2024-02-02');
    const company = new Company(
      baseData.legalName,
      baseData.businessName,
      baseData.taxId,
      baseData.type,
      baseData.adhesionDate,
      baseData.isActive,
      baseData.contactEmail,
      'company-id',
      lastTransferDate,
      ' 123 ',
      ' Address ',
    );

    expect(company.id).toBe('company-id');
    expect(company.lastTransferDate).toEqual(lastTransferDate);
    expect(company.contactPhone).toBe('123');
    expect(company.address).toBe('Address');
  });

  it('returns a plain object representation', () => {
    const company = new Company(
      baseData.legalName,
      baseData.businessName,
      baseData.taxId,
      baseData.type,
      baseData.adhesionDate,
      baseData.isActive,
      baseData.contactEmail,
    );

    const plain = company.toPlainObject();

    expect(plain).toEqual({
      legalName: 'Legal Name',
      businessName: 'Business Name',
      taxId: '12345678901',
      type: CompanyType.PYME,
      adhesionDate: baseData.adhesionDate,
      isActive: true,
      contactEmail: 'email@example.com',
      id: undefined,
      lastTransferDate: null,
      contactPhone: '',
      address: '',
    });
  });

  it('propagates validation errors', () => {
    expect(
      () =>
        new Company(
          '',
          baseData.businessName,
          baseData.taxId,
          baseData.type,
          baseData.adhesionDate,
          baseData.isActive,
          baseData.contactEmail,
        ),
    ).toThrow(new InvalidCompanyDataException('legalName is required'));
  });
});