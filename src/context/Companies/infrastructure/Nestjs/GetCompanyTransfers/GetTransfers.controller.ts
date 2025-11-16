// import { Body, Controller, Get } from '@nestjs/common';
// import { GetCompanyTransfers } from 'src/context/Companies/application/GetCompanyTransfers/GetCompanyTransfers.usecase';
// import { Company } from 'src/context/Companies/domain/Company';

// @Controller('company')
// export class GetCompanyTransfersController {
//   constructor(private readonly getCompanyTransfers: GetCompanyTransfers) {}

//   @Get('/get-company-transfers')
//   async run(@Body() GetCompanyTransfersHttpDTO: any): Promise<Company[]> {
//     return this.getCompanyTransfers.run(
//       GetCompanyTransfersHttpDTO.jwt,
//       GetCompanyTransfersHttpDTO.from,
//       GetCompanyTransfersHttpDTO.to,
//     );
//   }
// }
