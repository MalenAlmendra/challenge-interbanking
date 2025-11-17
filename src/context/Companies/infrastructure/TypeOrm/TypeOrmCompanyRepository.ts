import { Repository } from 'typeorm';
import { CompanyRepository } from '../../domain/CompanyRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../../domain/Company';
import { TypeOrmCompanyEntity } from './TypeOrmCompanyEntity';
import { Injectable } from '@nestjs/common';
import { subDays } from 'date-fns';
@Injectable()
export class TypeOrmCompanyRepository implements CompanyRepository {
  constructor(
    @InjectRepository(TypeOrmCompanyEntity)
    private readonly repository: Repository<TypeOrmCompanyEntity>,
  ) {}

  private mapToDomain(company: TypeOrmCompanyEntity) {
    return new Company(
      company.legalName,
      company.businessName,
      company.taxId,
      company.type,
      company.adhesionDate,
      company.isActive,
      company.contactEmail,
      company.id,
      company.lastTransferDate || null,
      company.contactPhone || '',
      company.address || '',
    );
  }

  async getCompanyTransfers(): Promise<Company[]> {
    const today = new Date();
    const lastMonthDate = subDays(today, 30);

    const companies = await this.repository
      .createQueryBuilder('company')
      .where('company.lastTransferDate BETWEEN :from AND :to', {
        from: lastMonthDate,
        to: today,
      })
      .getMany();

    return companies.map((company) => this.mapToDomain(company));
  }

  async getLastCompaniesAdded(): Promise<Company[]> {
    const today = new Date();
    const lastMonthDate = subDays(today, 30);

    const companies = await this.repository
      .createQueryBuilder('company')
      .where('company.adhesionDate BETWEEN :from AND :to', {
        from: lastMonthDate,
        to: today ,
      })
      .getMany();

    return companies.map((company) => this.mapToDomain(company));
  }

  async createCompany(company: Company): Promise<void> {
    const entity: Partial<TypeOrmCompanyEntity> = {
      legalName: company.legalName,
      businessName: company.businessName,
      taxId: company.taxId,
      type: company.type,
      adhesionDate: company.adhesionDate,
      isActive: company.isActive,
      contactEmail: company.contactEmail,
      lastTransferDate: company.lastTransferDate || undefined,
      contactPhone: company.contactPhone || '',
      address: company.address || '',
    };

    if (company.id) {
      entity.id = company.id;
    }

    this.repository.save(entity);
  }
}
