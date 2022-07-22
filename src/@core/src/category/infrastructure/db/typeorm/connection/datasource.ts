import { DataSource } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: 'localhost',
                port: 3306,
                username: 'postgres',
                password: 'postgres',
                database: 'myspace',
                entities: [
                    __dirname + '/../**/*-model{.ts,.js}',
                ],
                synchronize: false,
            });

            return dataSource.initialize();
        },
    },
];