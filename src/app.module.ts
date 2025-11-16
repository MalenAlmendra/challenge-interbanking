import { Module } from '@nestjs/common';
import { CompanyModule } from './context/Companies/infrastructure/Nestjs/company.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmCompanyEntity } from './context/Companies/infrastructure/TypeOrm/TypeOrmCompanyEntity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [TypeOrmCompanyEntity],
    }),
    CompanyModule,
  ],
  controllers: [],
})
export class AppModule {}
