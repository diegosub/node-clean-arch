import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from '@core/node/category/infrastructure';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);

    await AppDataSource.initialize();
}
bootstrap();
