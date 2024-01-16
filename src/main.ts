import { NestFactory } from '@nestjs/core';
<<<<<<< HEAD
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
=======
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { instance } from './logger/winston.logger';

async function bootstrap() {
  const POST = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
    }),
  });

  const config = new DocumentBuilder()
    .setTitle('Nest Backend')
    .setDescription('Documentation')
    .setVersion('1.0.0')
    .addTag('Vadzim Velikanets')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(POST);
}

>>>>>>> d58a1e6 (Create Nest App. Add Login, Registration and Authorization)
bootstrap();
