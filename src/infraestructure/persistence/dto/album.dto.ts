import { Album } from '../schemas/album.schema';

export type AlbumDTO = Partial<Album>;
export interface UpdateResponse {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: any;
  upsertedCount: number;
  matchedCount: number;
}

export interface DeleteResponse {
  acknowledged: boolean;
  deletedCount: number;
}
