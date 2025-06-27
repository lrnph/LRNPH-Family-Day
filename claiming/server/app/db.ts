// src/db.ts
import { DataSource } from 'typeorm';
import { Registration } from './models/registration-entity';
import { Employee } from './models/employee-entity';
import { Booth } from './models/booth-entity';
import { Claim } from './models/claim-entity';


const commonDbOptions = {
  type: 'mssql' as const,
  host: '172.16.2.8',
  username: 'SA',
  password: 'i2t400',
  synchronize: false, // Set to false in production!
  logging: false,
  options: {
    encrypt: false, // Set to true if using Azure SQL
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

export const familyDayDataSource = new DataSource({
  ...commonDbOptions,
  entities: [Registration, Booth, Claim],
  database: 'EVENT_FAMILY_DAY',
});

export const masterListDataSource = new DataSource({
  ...commonDbOptions,
  entities: [Employee],
  database: 'LRNPH_E',
});

export const initializeDatabases = async () => {
  try {
    await masterListDataSource.initialize();
    await familyDayDataSource.initialize();
    console.log('Databases successfully connected');
  } catch (error) {
    console.error('Failed to connect to databases', error);
  }
};
