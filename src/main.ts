import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Redis from 'ioredis';
import { redisConfig, sessionConfig } from './config/redis.config';
import * as session from 'express-session';
import { RedisStore } from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const redisClient = new Redis(redisConfig);

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      ...sessionConfig
    })
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
