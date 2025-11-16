import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateCompany } from '../../application/CreateCompany/CreateCompany.usecase';
import { GetCompaniesAdded } from '../../application/GetCompaniesAdded/GetCompaniesAdded.usecase';
import { CreateCompanyDto } from './CreateCompany/CreateCompany.dto';
import { CompanyResponseDto } from './dto/company.response.dto';
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
  async companiesAdded(): Promise<any[]> {
    return this.getCompaniesAdded.run();
  }

  @Get('/company-transfers/:idCompany')
  async companyTransfers(
    @Param('idCompany') idCompany: string,
  ): Promise<any[]> {
    return this.getCompanyTransfers.run(idCompany);
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
