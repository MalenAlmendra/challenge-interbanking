import { Company } from './Company';

export interface CompanyRepository {
  createCompany(company: Company): Promise<void>;
  getCompanyTransfers(): Promise<Company[]>;
  getLastCompaniesAdded(): Promise<Company[]>;
}
