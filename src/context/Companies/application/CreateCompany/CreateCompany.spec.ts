import { CreateCompany } from './CreateCompany.usecase';
import { Company } from '../../domain/Company';
import { CompanyRepository } from '../../domain/CompanyRepository';
import { CompanyType } from '../../domain/companyType.enum';

describe('CreateCompany use case', () => {
  const repository: jest.Mocked<CompanyRepository> = {
    createCompany: jest.fn(),
    getCompanyTransfers: jest.fn(),
    getLastCompaniesAdded: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('builds a Company and delegates persistence to the repository', async () => {
    repository.createCompany.mockResolvedValue();

    const useCase = new CreateCompany(repository);
    await useCase.run(
      ' Legal Name ',
      ' Business Name ',
      '12345678901',
      CompanyType.CORPORATE,
      new Date('2024-01-01'),
      true,
      ' email@example.com ',
      'company-id',
      null,
      ' 123 ',
      ' Address ',
    );

    expect(repository.createCompany).toHaveBeenCalledTimes(1);
    const companyArg = repository.createCompany.mock.calls[0][0] as Company;

    expect(companyArg).toBeInstanceOf(Company);
    expect(companyArg.legalName).toBe('Legal Name');
    expect(companyArg.businessName).toBe('Business Name');
    expect(companyArg.type).toBe(CompanyType.CORPORATE);
    expect(companyArg.id).toBe('company-id');
    expect(companyArg.contactPhone).toBe('123');
    expect(companyArg.address).toBe('Address');
  });
});
