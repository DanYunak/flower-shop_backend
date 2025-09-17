import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000'

  app.enableCors({
    origin: clientUrl,
    credentials: true
  })

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
