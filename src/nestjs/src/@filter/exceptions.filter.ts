import { ArgumentsHost, Catch, ExceptionFilter, Injectable } from '@nestjs/common';
import { LoggerService } from 'src/@logger';
import { PayloadErrorBuilder } from './payload.error.builder';


@Catch()
@Injectable()
export class ExceptionsFilter implements ExceptionFilter<Error> {

    constructor(private readonly logger: LoggerService) {
    }

    catch(exception: Error, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        //const request = ctx.getRequest();

        // const requestLog = {
        //     hostname: request.hostname,
        //     url: request.url,
        //     requestMethod: request.method,
        //     requestBody: request.body,
        //     requestHeaders: request.headers,
        // };

        //this.logger.log(requestLog);

        this.logger.error(exception.stack);

        const payloadError = new PayloadErrorBuilder(exception).build();

        response.status(payloadError.status).json(payloadError);
    }
}