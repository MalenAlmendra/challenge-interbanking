import { Company } from '../../domain/Company';
import type { CompanyRepository } from '../../domain/CompanyRepository';
import { CompanyType } from '../../domain/companyType.enum';

export class CreateCompany {
  constructor(private readonly repository: CompanyRepository) {}
  // El metodo run recibe valores primitivos.
  async run(
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
  ): Promise<void> {
    const company = new Company(
      id,
      legalName,
      businessName,
      taxId,
      type,
      adhesionDate,
      isActive,
      contactEmail,
      lastTransferDate || null,
      contactPhone || '',
      address || '',
    );
    return this.repository.createCompany(company);
  }
}
