import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { CompanyType } from '../../../domain/companyType.enum';

export class CreateCompanyDto {
  @ApiProperty({ example: 'INTERBANKING S.A.' })
  @IsString()
  @Length(2, 150)
  legalName: string;

  @ApiProperty({ example: 'Interbanking' })
  @IsString()
  @Length(2, 80)
  businessName: string;

  @ApiProperty({ example: '30-12345678-9', description: 'CUIT de la empresa' })
  @IsString()
  @Length(11, 20)
  taxId: string;

  @ApiProperty({
    example: CompanyType.PYME,
    enum: CompanyType,
    description: 'PYME = Pyme, CORPORATE = Empresa corporativa',
  })
  @IsEnum(CompanyType)
  type: CompanyType;

  @ApiProperty({ example: 'contacto@empresa.com' })
  @IsEmail()
  contactEmail: string;

  @IsString()
  adhesionDate: Date;

  @ApiProperty({ example: '+54-11-5555-5555', required: false })
  @IsOptional()
  @IsString()
  contactPhone?: string;

  @ApiProperty({ example: 'Av. Siempre Viva 123, CABA', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: true,
    description: 'Indica si la empresa queda activa desde el alta',
    required: false,
  })
  @IsBoolean()
  isActive: boolean;
}
