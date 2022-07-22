import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'myspace',
            autoLoadEntities: true,
            synchronize: false,
        }),
        CategoryModule
    ],
    providers: [AppService],
})
export class AppModule { }
