import { CompanyType } from './companyType.enum';

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
    this.legalName = legalName;
    this.businessName = businessName;
    this.taxId = taxId;
    this.type = type;
    this.adhesionDate = adhesionDate;
    this.isActive = isActive;
    this.contactEmail = contactEmail;
    this.id = id;
    this.lastTransferDate = lastTransferDate || null;
    this.contactPhone = contactPhone || '';
    this.address = address || '';
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
