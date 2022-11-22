import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class PersistenceConfiguration implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: process.env.DATABASE_URL,
      user: process.env.DATABASE_USER,
      pass: process.env.DATABASE_PASSWORD,
    };
  }
}
