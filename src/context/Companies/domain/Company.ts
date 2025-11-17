import { CompanyType } from './companyType.enum';
import { CompanyValidations } from './CompanyValidations';

export class Company {
  legalName: string;
  businessName: string;
  taxId: string;
  type: CompanyType;
  adhesionDate: Date;
  isActive: boolean;
  contactEmail: string;
  id?: string;
  lastTransferDate?: Date | null;
  contactPhone?: string;
  address?: string;

  constructor(
    legalName: string,
    businessName: string,
    taxId: string,
    type: CompanyType,
    adhesionDate: Date,
    isActive: boolean,
    contactEmail: string,
    id?: string | undefined,
    lastTransferDate?: Date | null,
    contactPhone?: string,
    address?: string,
  ) {
    const validations = new CompanyValidations();
    validations.validateMandatoryStrings(
      legalName,
      businessName,
      taxId,
      contactEmail,
    );
    validations.validateAdhesionDate(adhesionDate);
    validations.validateCompanyType(type);
    validations.validateOptionalDates(lastTransferDate);

    this.legalName = legalName.trim();
    this.businessName = businessName.trim();
    this.taxId = taxId.trim();
    this.type = type;
    this.adhesionDate = adhesionDate;
    this.isActive = isActive;
    this.contactEmail = contactEmail.trim();
    this.id = id;
    this.lastTransferDate = lastTransferDate || null;
    this.contactPhone = (contactPhone || '').trim();
    this.address = (address || '').trim();
  }

  public toPlainObject() {
    return {
      legalName: this.legalName,
      businessName: this.businessName,
      taxId: this.taxId,
      type: this.type,
      adhesionDate: this.adhesionDate,
      isActive: this.isActive,
      contactEmail: this.contactEmail,
      id: this.id,
      lastTransferDate: this.lastTransferDate,
      contactPhone: this.contactPhone,
      address: this.address,
    };
  }
}
