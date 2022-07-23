import { Module } from '@nestjs/common';
import { LoggerService, LoggerServiceModule } from 'src/@logger';
import { ExceptionsFilter } from './exceptions.filter';


@Module({
    imports: [
        LoggerServiceModule
    ],
    providers: [
        ExceptionsFilter
    ],
    exports: [
        ExceptionsFilter
    ]
})
export class ExceptionsFilterModule { }