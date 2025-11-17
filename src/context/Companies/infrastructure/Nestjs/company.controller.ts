import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateCompany } from '../../application/CreateCompany/CreateCompany.usecase';
import { GetCompaniesAdded } from '../../application/GetCompaniesAdded/GetCompaniesAdded.usecase';
import { CompanyResponseDto, CreateCompanyDto } from './Company.dto';
import { GetCompanyTransfers } from '../../application/GetCompanyTransfers/GetCompanyTransfers.usecase';

@Controller('company')
export class CompanyController {
  constructor(
    @Inject('CreateCompany') private readonly createCompany: CreateCompany,
    @Inject('GetCompaniesAdded')
    private readonly getCompaniesAdded: GetCompaniesAdded,
    @Inject('GetCompanyTransfers')
    private readonly getCompanyTransfers: GetCompanyTransfers,
  ) {}

  @Get('/companies-added')
  async companiesAdded(): Promise<CompanyResponseDto[]> {
    return this.getCompaniesAdded.run();
  }

  @Get('/company-transfers/:idCompany')
  async companyTransfers(): Promise<CompanyResponseDto[]> {
    return this.getCompanyTransfers.run();
  }

  @Post('/create')
  async create(@Body() createCompanyDTO: CreateCompanyDto): Promise<void> {
    const {
      legalName,
      businessName,
      contactEmail,
      taxId,
      type,
      address,
      contactPhone,
      isActive,
    } = createCompanyDTO;
    return this.createCompany.run(
      legalName,
      businessName,
      taxId,
      type,
      new Date(),
      isActive,
      contactEmail,
      undefined,
      null,
      contactPhone,
      address,
    );
  }
}
