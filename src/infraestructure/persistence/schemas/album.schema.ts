import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AlbumDocument = Album & Document;
export type AlbumRepositoryResponse = Album & { _id?: string } & {
  __v?: number;
};

@Schema({ timestamps: false, versionKey: false, collection: 'albums' })
export class Album {
  _id?: string;
  @Prop()
  artistName: string;

  @Prop()
  artistLastname: string;

  @Prop()
  albumName: string;

  @Prop()
  albumYear: string;

  @Prop()
  albumCover: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
