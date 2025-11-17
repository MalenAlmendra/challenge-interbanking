import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateCompany } from '../../application/CreateCompany/CreateCompany.usecase';
import { TypeOrmCompanyRepository } from '../TypeOrm/TypeOrmCompanyRepository';
import { TypeOrmCompanyEntity } from '../TypeOrm/TypeOrmCompanyEntity';
import { CreateCompanyDto } from '../Nestjs/Company.dto';

type ApiGatewayEvent = {
  body: string | null;
};

type ApiGatewayResult = {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
};

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [TypeOrmCompanyEntity],
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : undefined,
  synchronize: false,
  logging: false,
});

let dataSourcePromise: Promise<DataSource> | null = null;
async function getDataSource(): Promise<DataSource> {
  if (!dataSourcePromise) {
    dataSourcePromise = dataSource.initialize();
  }

  return dataSourcePromise;
}

export const handler = async (
  event: ApiGatewayEvent,
): Promise<ApiGatewayResult> => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Body is required' }),
    };
  }

  let payload: unknown;
  try {
    payload = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Body not available: must be JSON', detail: String(error) }),
    };
  }

  const dto = plainToInstance(CreateCompanyDto, payload);
  const errors = await validate(dto, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  if (errors.length > 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Validation Error',
        errors: errors.map((err) => ({
          property: err.property,
          constraints: err.constraints,
        })),
      }),
    };
  }

  const database = await getDataSource();
  const repository = new TypeOrmCompanyRepository(
    database.getRepository(TypeOrmCompanyEntity),
  );
  const useCase = new CreateCompany(repository);

  await useCase.run(
    dto.legalName,
    dto.businessName,
    dto.taxId,
    dto.type,
    dto.adhesionDate ? new Date(dto.adhesionDate) : new Date(),
    dto.isActive,
    dto.contactEmail,
    undefined,
    null,
    dto.contactPhone,
    dto.address,
  );

  return {
    statusCode: 201,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: 'Company stored correctly',
      legalName: dto.legalName,
      taxId: dto.taxId,
    }),
  };
};