import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'dpg-cvr97kbuibrs73ae6hr0-a.oregon-postgres.render.com',
        port: 5432,
        username: 'fastfood_db_user', 
        password: 'kkwSIqOcanvEPucI61aWo6m5kYVPLXcj', 
        database: 'fastfood_db', 
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        ssl: true, 
        extra: {
          ssl: {
            rejectUnauthorized: false 
          }
        }
      });
      return dataSource.initialize();
    },
  },
];