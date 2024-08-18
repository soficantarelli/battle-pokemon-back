import { DataSourceOptions, DataSource } from 'typeorm';

export const configData: DataSourceOptions = {
  type: 'sqlite',
  database:'db.sqlite',
  entities: ['dist/entity/*.entity{.ts,.js}'],
  migrations: ["migrations/*{.ts,.js}"],
  synchronize: true,
  logging: true,
} 

const dataSource = new DataSource(configData);
export default dataSource;