import { GetCompanyTransfers } from './GetCompanyTransfers.usecase';
import { CompanyRepository } from '../../domain/CompanyRepository';
import { Company } from '../../domain/Company';
import { CompanyType } from '../../domain/companyType.enum';

describe('GetCompanyTransfers use case', () => {
  const sampleCompany = new Company(
    'Legal Name',
    'Business Name',
    '12345678901',
    CompanyType.CORPORATE,
    new Date('2024-01-01'),
    true,
    'email@example.com',
  );

  const repository: jest.Mocked<CompanyRepository> = {
    createCompany: jest.fn(),
    getCompanyTransfers: jest.fn(),
    getLastCompaniesAdded: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retrieves transfers from the repository', async () => {
    repository.getCompanyTransfers.mockResolvedValue([sampleCompany]);

    const useCase = new GetCompanyTransfers(repository);
    const result = await useCase.run();

    expect(repository.getCompanyTransfers).toHaveBeenCalledTimes(1);
    expect(result).toEqual([sampleCompany]);
  });
});
