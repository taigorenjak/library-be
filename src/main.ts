import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Omogoči CORS (za ločen frontend, npr. React/Vue/Angular)
  app.enableCors();

  // Inicializira app
  await app.init();

  // Poslušaj na portu iz .env ali 3000
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`App running on http://localhost:${port}`);
}
bootstrap();