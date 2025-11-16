// import { Body, Controller, Post } from '@nestjs/common';
// import { CreateCompany } from '../../../application/CreateCompany/CreateCompany.usecase';

// @Controller('company')
// export class CreateCompanyController {
//   constructor(private readonly createCompanyUseCase: CreateCompany) {}
//   @Post('/')
//   async run(@Body() createCompanyHttpDTO: any): Promise<any> {
//     return await this.createCompanyUseCase.run(
//       createCompanyHttpDTO.id,
//       createCompanyHttpDTO.name,
//       createCompanyHttpDTO.email,
//       createCompanyHttpDTO.typeCompany,
//       new Date(),
//     );
//   }
// }
