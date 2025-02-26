import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Redis from 'ioredis';
import { redisConfig, sessionConfig } from './config/redis.config';
import * as session from 'express-session';
import { RedisStore } from 'connect-redis';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const redisClient = new Redis(redisConfig);

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      ...sessionConfig
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Manage shop')
    .setDescription('BE NestJ - Manage shop')
    .setVersion('0.1')
    .addBearerAuth()
    .addBasicAuth()
    .addCookieAuth()
    .setExternalDoc('Postman collection', '/docs-json')
    .addServer(`http://localhost:3000`)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
