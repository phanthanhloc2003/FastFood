// import { DataSource } from 'typeorm';

// export const databaseProviders = [
//   {
//     provide: 'DATA_SOURCE',
//     useFactory: async () => {
//       const dataSource = new DataSource({
//         type: 'postgres',
//         host: 'dpg-d0jc83euk2gs73bnk9p0-a.oregon-postgres.render.com',
//         port: 5432,
//         username: 'thanhloc', 
//         password: 'KUi2boNnetFkTjrR9RIockbSasJ8mh7s', 
//         database: 'postgres1_55ko', 
//         entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//         synchronize: true,
//         ssl: true, 
//         extra: {
//           ssl: {
//             rejectUnauthorized: false 
//           }
//         }
//       });
//       return dataSource.initialize();
//     },
//   },
// ];

// import { DataSource } from 'typeorm';

// export const databaseProviders = [
//   {
//     provide: 'DATA_SOURCE',
//     useFactory: async () => {
//       const dataSource = new DataSource({
//         type: 'postgres',
//         host: 'localhost',
//         port: 5432,
//         username: 'postgres', 
//         password: 'Ptl2003.', 
//         database: 'postgres', 
//         entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//         synchronize: true,
//       });
//       return dataSource.initialize();
//     },
//   },
// ];


import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'ep-floral-king-a8wy40wo-pooler.eastus2.azure.neon.tech',
        port: 5432,
        username: 'neondb_owner',
        password: 'npg_rOh1w2esqPcY',
        database: 'neondb',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false, // Neon yêu cầu SSL nhưng không cần verify CA
          },
        },
      });
      return dataSource.initialize();
    },
  },
];