import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PersistenceConfiguration } from './configuration/persistence.configuration';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: PersistenceConfiguration,
    }),
    PersistenceModule,
  ],
  exports: [PersistenceModule],
})
export class InfraestructureModule {}
