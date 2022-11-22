import { Module } from '@nestjs/common';
import { ServicesModule } from '../services/services.module';
import { AlbumController } from './album.controller';

@Module({
  imports: [ServicesModule],
  controllers: [AlbumController],
  providers: [],
})
export class ControllersModule {}
