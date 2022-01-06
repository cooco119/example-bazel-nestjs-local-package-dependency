import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { hello } from "shared";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  hello();
  await app.listen(3000);
}
bootstrap();
