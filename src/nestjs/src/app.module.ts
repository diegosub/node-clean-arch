import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionsFilterModule } from './@filter';
import { LoggerServiceModule } from './@logger';
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
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ExceptionsFilterModule,
        CategoryModule
    ],
    providers: [AppService],
})
export class AppModule { }
