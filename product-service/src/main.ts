import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Increase payload size to accept large base64 image uploads
  app.use((await import('express')).json({ limit: '10mb' }));
  app.use((await import('express')).urlencoded({ limit: '10mb', extended: true }));

  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
