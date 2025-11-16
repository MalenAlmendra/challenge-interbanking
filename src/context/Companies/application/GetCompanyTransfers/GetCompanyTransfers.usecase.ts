import { Company } from '../../domain/Company';
import type { CompanyRepository } from '../../domain/CompanyRepository';

export class GetCompanyTransfers {
  constructor(private readonly repository: CompanyRepository) {}

  async run(idCompany: string): Promise<Company[]> {
    return this.repository.getCompanyTransfers(idCompany);
  }
}
