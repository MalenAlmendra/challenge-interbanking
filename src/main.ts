import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  app.enableShutdownHooks();

  const shutdownSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];

  shutdownSignals.forEach((signal) =>
    process.on(signal, async () => {
      console.log(`Signal ${signal} received. Closing the application...`);
      await app.close();
      process.exit(0);
    }),
  );

  //MOCK DE CREACIÓN
  const newCompanyMock = {
    legalName: 'Malen Almendra',
    businessName: 'Le Pingouin Studio Code',
    contactEmail: 'lepinoguin@gmail.com',
    taxId: '27-35886703-6',
    type: 'PYME',
    address: 'Villegas 932',
    contactPhone: '2914374737',
    isActive: true,
  };

  //Este fragmento de codigo se introduce para que se pueda ver el funcionamiento de los endpoints

  // ENDPOINTS
  //GET COMPANIES ADDED
  const useCase = app.get('GetCompaniesAdded');
  const result1 = await useCase.run();
  console.log('Empresas encontradas en los últimos 30 días:', result1);
  
  //CREATE COMPANY
  // const createCompanyUseCase = app.get('CreateCompany');
  // await createCompanyUseCase.run(
  //   newCompanyMock.legalName,
  //   newCompanyMock.businessName,
  //   newCompanyMock.taxId,
  //   newCompanyMock.type,
  //   new Date(),
  //   newCompanyMock.isActive,
  //   newCompanyMock.contactEmail,
  //   undefined,
  //   null,
  //   newCompanyMock.contactPhone,
  //   newCompanyMock.address,
  // );
  // console.log('Empresa Creada!!');

  //GET COMPANY TRANSFERS
  const getCompanyTransfersUseCase= app.get('GetCompanyTransfers')
  const result3 = await getCompanyTransfersUseCase.run('a7f7dd53-06e1-43b7-9e37-2d26e234cd44');
  console.log('Ultima Transferencia del mes de la empresa:', result3);
}
bootstrap();
