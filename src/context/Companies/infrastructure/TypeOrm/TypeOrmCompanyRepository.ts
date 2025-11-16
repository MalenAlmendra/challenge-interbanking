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
      company.id,
      company.legalName,
      company.businessName,
      company.taxId,
      company.type,
      company.adhesionDate,
      company.isActive,
      company.contactEmail,
      company.lastTransferDate || null,
      company.contactPhone || '',
      company.address || '',
    );
  }

  async getCompanyTransfers(idCompany: string): Promise<Company[]> {
    //la fecha de busqueda debe ser de 30 días hacia atras a partir de la fecha actual.
    //se debe realizar la llamada a la tabla de transferencias

    const today = new Date();
    const lastMonthDate = subDays(today, 30);

    const companies = await this.repository
      .createQueryBuilder('company')
      .where('company.id === :id', { idCompany })
      .andWhere('company.lastTransferDate BETWEEN :from AND :to', {
        today,
        lastMonthDate,
      })
      .getMany();

    return companies.map((company) => this.mapToDomain(company));
  }

  async getLastCompaniesAdded(): Promise<Company[]> {
    //la fecha de busqueda debe ser de 30 días hacia atras a partir de la fecha actual.
    const today = new Date();
    const lastMonthDate = subDays(today, 30);

    const companies = await this.repository
      .createQueryBuilder('company')
      .where('company.adhesisonDate BETWEEN :from AND :to', {
        today,
        lastMonthDate,
      })
      .getMany();

    return companies.map((company) => this.mapToDomain(company));
  }

  async createCompany(company: Company): Promise<void> {
    this.repository.save({
      id: company.id,
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
    });
  }
}
