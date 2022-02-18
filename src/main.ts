import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import config from '@config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ioasys api')
    .addBearerAuth()
    .setVersion('1')
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, swaggerDoc);

  const logger = new Logger('Nest API');

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(config.port, () =>
    logger.log(`API started on ${config.port}`),
  );
}
bootstrap();
