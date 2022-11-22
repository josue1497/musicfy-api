import { Module } from '@nestjs/common';
import { InfraestructureModule } from '../infraestructure/infraestructure.module';
import { AlbumService } from './album.service';

const services = [AlbumService];

@Module({
  imports: [InfraestructureModule],
  providers: services,
  exports: services,
})
export class ServicesModule {}
