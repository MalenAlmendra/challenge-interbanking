import { ApiProperty } from '@nestjs/swagger';
import { CompanyType } from '../../../domain/companyType.enum';

export class CompanyResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  legalName: string;

  @ApiProperty()
  businessName: string;

  @ApiProperty()
  taxId: string;

  @ApiProperty({ enum: CompanyType })
  type: CompanyType;

  @ApiProperty()
  adhesionDate: Date;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  contactEmail: string;

  @ApiProperty({ required: false })
  contactPhone?: string;

  @ApiProperty({ required: false })
  address?: string;
}
