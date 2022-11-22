import {
  Injectable,
  NotFoundException,
  ConflictException,
  NotAcceptableException,
} from '@nestjs/common';
import { CoreResponse } from '../core/types.core';
import {
  AlbumDTO,
  DeleteResponse,
  UpdateResponse,
} from '../infraestructure/persistence/dto/album.dto';
import { AlbumRepository } from '../infraestructure/persistence/repositories/album.repository';
import { AlbumRepositoryResponse } from '../infraestructure/persistence/schemas/album.schema';

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async getAlbums(): Promise<CoreResponse<AlbumRepositoryResponse[]>> {
    return { data: await this.albumRepository.getAlbums() };
  }

  async getAlbum(_id: string): Promise<CoreResponse<AlbumRepositoryResponse>> {
    const album = await this.albumRepository.getAlbum(_id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return { data: album };
  }

  async createAlbum(
    album: AlbumDTO,
  ): Promise<CoreResponse<AlbumRepositoryResponse>> {
    await this.validateUniqueAlbumKeys(album);
    let result: AlbumRepositoryResponse;
    if (await this.couldSaveAlbums()) {
      result = await this.albumRepository.createAlbum(album);
    }
    return { data: result };
  }

  async updateAlbum(
    id: string,
    album: AlbumDTO,
  ): Promise<CoreResponse<UpdateResponse>> {
    await this.getAlbum(id);
    const updatedData = await this.albumRepository.updateAlbum(id, album);

    return { data: updatedData };
  }

  async deleteAlbum(id: string): Promise<CoreResponse<DeleteResponse>> {
    await this.getAlbum(id);
    const updatedData = await this.albumRepository.deleteAlbum(id);

    return { data: updatedData };
  }

  private async validateUniqueAlbumKeys({
    albumName,
    albumYear,
    artistName,
  }: AlbumDTO): Promise<void> {
    const albums = await this.albumRepository.findBy({
      albumYear,
      albumName,
      artistName,
    });
    if (albums.length > 0) {
      throw new ConflictException('There is an album whit this information');
    }
  }

  private async couldSaveAlbums(): Promise<boolean> {
    const qty = await this.albumRepository.countBy({});
    if (qty >= 20) {
      throw new NotAcceptableException('The album database is full right now.');
    }

    return true;
  }
}
