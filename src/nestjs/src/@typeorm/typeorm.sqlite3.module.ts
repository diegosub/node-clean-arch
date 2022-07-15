import { CategoryModel } from "@core/node/category/infrastructure";
import { TypeOrmModule } from "@nestjs/typeorm";

export const TypeOrmSQLITETestingModule = () => [
    TypeOrmModule.forRoot({
        type: 'better-sqlite3',
        database: ':memory:',
        dropSchema: true,
        entities: [CategoryModel],
        synchronize: true,
    }),
    TypeOrmModule.forFeature([CategoryModel]),
];