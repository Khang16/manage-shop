import { SessionOptions } from "express-session";
import { RedisOptions } from "ioredis";

export const redisConfig: RedisOptions = {
  host: 'localhost',
  port: 6379,
}

export const sessionConfig: SessionOptions = {
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000, 
    httpOnly: true,
    sameSite: 'strict'
  },  
}