import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  ///allow ng to request from :4200
  app.enableCors();
  const port = process.env.PORT || 3000;

  await app.listen(port);
}
bootstrap();
