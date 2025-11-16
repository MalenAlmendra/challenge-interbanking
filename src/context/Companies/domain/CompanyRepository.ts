import { Company } from './Company';

export interface CompanyRepository {
  createCompany(company: Company): Promise<void>;
  getCompanyTransfers(idCompany: string): Promise<Company[]>;
  getLastCompaniesAdded(): Promise<Company[]>;
}
