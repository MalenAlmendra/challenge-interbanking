import { Company } from '../../domain/Company';
import { CompanyRepository } from '../../domain/CompanyRepository';

export class GetCompaniesAdded {
  constructor(private readonly repository: CompanyRepository) {}

  async run(): Promise<Company[]> {
    return this.repository.getLastCompaniesAdded();
  }
}
