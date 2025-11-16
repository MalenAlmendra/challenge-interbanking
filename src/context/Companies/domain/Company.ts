import { CompanyType } from './companyType.enum';

export class Company {
  id: string;
  legalName: string;
  businessName: string;
  taxId: string;
  type: CompanyType;
  adhesionDate: Date;
  isActive: boolean;
  contactEmail: string;
  lastTransferDate?: Date | null;
  contactPhone?: string;
  address?: string;

  constructor(
    id: string,
    legalName: string,
    businessName: string,
    taxId: string,
    type: CompanyType,
    adhesionDate: Date,
    isActive: boolean,
    contactEmail: string,
    lastTransferDate?: Date | null,
    contactPhone?: string,
    address?: string,
  ) {
    this.legalName = legalName;
    this.businessName = businessName;
    this.taxId = taxId;
    this.type = type;
    this.adhesionDate = adhesionDate;
    this.isActive = isActive;
    this.contactEmail = contactEmail;
    this.lastTransferDate = lastTransferDate || null;
    this.contactPhone = contactPhone || '';
    this.address = address || '';
  }

  public toPlainObject() {
    return {
      id: this.id,
      legalName: this.legalName,
      businessName: this.businessName,
      taxId: this.taxId,
      type: this.type,
      adhesionDate: this.adhesionDate,
      isActive: this.isActive,
      contactEmail: this.contactEmail,
      lastTransferDate: this.lastTransferDate,
      contactPhone: this.contactPhone,
      address: this.address,
    };
  }
}
