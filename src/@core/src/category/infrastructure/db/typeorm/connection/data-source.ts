import { CategoryModel } from "../category-model";
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "myspace",
    synchronize: false,
    logging: true,
    entities: [CategoryModel],
    subscribers: [],
    migrations: [],
})