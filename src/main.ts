import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from "./transform.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); //Kullandigimiz validator classinin calismasi icin bu lazim.
  app.useGlobalInterceptors(new TransformInterceptor());
  const port = process.env.PORT;
  console.log(port);
  await app.listen(port);
}
bootstrap();
