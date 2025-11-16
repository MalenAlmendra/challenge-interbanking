// import { Body, Controller, Get } from '@nestjs/common';
// import { GetCompaniesAdded } from 'src/context/Companies/application/GetCompaniesAdded/GetCompaniesAdded.usecase';

// @Controller('company')
// export class GetCompaniesAddedController {
//   constructor(private readonly getCompaniesAdded: GetCompaniesAdded) {}

//   @Get('/get-companies-added')
//   async run(@Body() GetCompaniesAddedHttpDTO: any): Promise<any> {
//     return this.getCompaniesAdded.run(
//       GetCompaniesAddedHttpDTO.jwt,
//       GetCompaniesAddedHttpDTO.from,
//       GetCompaniesAddedHttpDTO.to,
//     );
//   }
// }
