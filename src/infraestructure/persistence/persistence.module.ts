import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlbumRepository } from './repositories/album.repository';
import { Album, AlbumSchema } from './schemas/album.schema';

const repositories = [AlbumRepository];

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Album.name,
        schema: AlbumSchema,
      },
    ]),
  ],
  providers: repositories,
  exports: repositories,
})
export class PersistenceModule {}
