import { ApiProperty } from '@nestjs/swagger';
import { CompanyResponseDto } from '../dto/company.response.dto';

export class CompanyTransferStatsDto extends CompanyResponseDto {
  @ApiProperty({
    example: 12,
    description: 'Cantidad de transferencias en el último mes',
  })
  monthlyTransferCount: number;

  @ApiProperty({
    example: 1500000.5,
    description: 'Monto total transferido en el último mes (en moneda local)',
  })
  monthlyTransferAmount: number;
}