import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.init();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`App running on http://localhost:${port}`);
}
bootstrap();