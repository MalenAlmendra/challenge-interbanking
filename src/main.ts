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

  

//A partir de acá, se introduce codigo de prueba para que se pueda ver el funcionamiento de los endpoints sin el HTTPServer. A su ves, se puede probar la creación de los usuarios descomentando el codig Create Company.

//MOCK DE CREACIÓN
  const newCompanyMock = {
    legalName: 'Juan Perez',
    businessName: 'La casita del código',
    contactEmail: 'lacasitadelcodigo@gmail.com',
    taxId: '23-16234987-1',
    type: 'PYME',
    address: 'Calle Dorrego 2030',
    contactPhone: '29260987294',
    isActive: true,
  };

  // ENDPOINTS
  //GET COMPANIES ADDED
  const useCase = app.get('GetCompaniesAdded');
  const result1 = await useCase.run();
  console.log('Empresas encontradas en los últimos 30 días:', result1);
  

  //GET COMPANY TRANSFERS
  const getCompanyTransfersUseCase= app.get('GetCompanyTransfers')
  const result3 = await getCompanyTransfersUseCase.run('a7f7dd53-06e1-43b7-9e37-2d26e234cd44');
  console.log('Ultima Transferencia del mes de la empresa:', result3);

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

}
bootstrap();
