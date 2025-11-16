import { Module } from '@nestjs/common';
import { CreateCompany } from '../../application/CreateCompany/CreateCompany.usecase';
import { TypeOrmCompanyRepository } from '../TypeOrm/TypeOrmCompanyRepository';
import { GetCompaniesAdded } from '../../application/GetCompaniesAdded/GetCompaniesAdded.usecase';
import { GetCompanyTransfers } from '../../application/GetCompanyTransfers/GetCompanyTransfers.usecase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCompanyEntity } from '../TypeOrm/TypeOrmCompanyEntity';
import { CompanyController } from './company.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmCompanyEntity])],
  providers: [
    {
      provide: 'TypeOrmCompanyRepository',
      useClass: TypeOrmCompanyRepository,
    },
    {
      provide: 'CreateCompany',
      useFactory: (repository: TypeOrmCompanyRepository) =>
        new CreateCompany(repository),
      inject: ['TypeOrmCompanyRepository'],
    },
    {
      provide: 'GetCompaniesAdded',
      useFactory: (repository: TypeOrmCompanyRepository) =>
        new GetCompaniesAdded(repository),
      inject: ['TypeOrmCompanyRepository'],
    },
    {
      provide: 'GetCompanyTransfers',
      useFactory: (repository: TypeOrmCompanyRepository) =>
        new GetCompanyTransfers(repository),
      inject: ['TypeOrmCompanyRepository'],
    },
  ],
  controllers:[CompanyController]
})
export class CompanyModule {}
