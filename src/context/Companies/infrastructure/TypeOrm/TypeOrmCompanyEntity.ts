import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CompanyType } from '../../domain/companyType.enum';

@Entity('company')
export class TypeOrmCompanyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  legalName: string;

  @Column()
  businessName: string;

  @Column({ unique: true })
  taxId: string;

  @Column({ type: 'enum', enum: CompanyType, enumName: 'company_type' })
  type: CompanyType;

  @Column()
  adhesionDate: Date;

  @Column()
  isActive: boolean;

  @Column()
  contactEmail: string;

  @Column({ nullable: true })
  lastTransferDate?: Date;

  @Column()
  contactPhone?: string;

  @Column()
  address?: string;
}
