import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { ExceptionsFilter } from './@filter/exceptions.filter';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const exceptionsFilter = app.get(ExceptionsFilter);

    app.setGlobalPrefix(configService.get('API_GLOBAL_PREFIX'));
    app.use(helmet());
    app.use(compression());
    app.enableCors();
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb' }));

    app.useGlobalFilters(exceptionsFilter);

    await app.listen(configService.get('SERVER_PORT'));
}

(async () => {

    await bootstrap();

})();
