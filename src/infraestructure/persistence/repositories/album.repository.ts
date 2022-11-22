import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AlbumDTO, DeleteResponse, UpdateResponse } from '../dto/album.dto';
import {
  Album,
  AlbumDocument,
  AlbumRepositoryResponse,
} from '../schemas/album.schema';

@Injectable()
export class AlbumRepository {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
  ) {}

  async createAlbum(album: AlbumDTO): Promise<AlbumRepositoryResponse> {
    return await this.albumModel.create(album);
  }
  async updateAlbum(_id: string, album: AlbumDTO): Promise<UpdateResponse> {
    return this.albumModel.updateOne({ _id }, { ...album });
  }

  async deleteAlbum(_id: string): Promise<DeleteResponse> {
    return this.albumModel.deleteOne({ _id });
  }

  async getAlbums(): Promise<AlbumRepositoryResponse[]> {
    return this.albumModel.find();
  }

  async getAlbum(_id: string): Promise<AlbumRepositoryResponse> {
    return this.albumModel.findOne({ _id });
  }

  async findBy(query: any): Promise<AlbumRepositoryResponse[]> {
    return this.albumModel.find(query);
  }

  async countBy(query: any): Promise<number> {
    return this.albumModel.find(query).count();
  }
}
