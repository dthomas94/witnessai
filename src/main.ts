import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('/api');
  app.set('query parser', 'extended'); // parse query parameters as an object
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN'),
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
  });

  app.useGlobalPipes(new ValidationPipe()); // ensures all endpoints receive correct data

  const config = new DocumentBuilder() // https://docs.nestjs.com/openapi/introduction#bootstrap
    .setTitle('Witness AI')
    .setDescription('Witness AI API')
    .setVersion('1.0')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
