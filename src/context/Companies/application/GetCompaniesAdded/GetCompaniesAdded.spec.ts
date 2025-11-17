import { GetCompaniesAdded } from './GetCompaniesAdded.usecase';
import { CompanyRepository } from '../../domain/CompanyRepository';
import { Company } from '../../domain/Company';
import { CompanyType } from '../../domain/companyType.enum';

describe('GetCompaniesAdded use case', () => {
  const sampleCompany = new Company(
    'Legal Name',
    'Business Name',
    '12345678901',
    CompanyType.PYME,
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

  it('returns the companies provided by the repository', async () => {
    repository.getLastCompaniesAdded.mockResolvedValue([sampleCompany]);

    const useCase = new GetCompaniesAdded(repository);
    const result = await useCase.run();

    expect(repository.getLastCompaniesAdded).toHaveBeenCalledTimes(1);
    expect(result).toEqual([sampleCompany]);
  });
});
