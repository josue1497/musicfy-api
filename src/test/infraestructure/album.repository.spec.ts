import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { PersistenceModule } from '../../infraestructure/persistence/persistence.module';
import { AlbumRepository } from '../../infraestructure/persistence/repositories/album.repository';
import * as data from '../data/mockups.json';

describe('AlbumRepository', () => {
  let albumRepository: AlbumRepository;
  const mockRepository = {
    create: jest.fn().mockResolvedValueOnce(data.albumCreatedResponse.data),
    updateOne: jest.fn().mockResolvedValueOnce(data.albumUpdatedResponse.data),
    find: jest
      .fn()
      .mockResolvedValueOnce(data.getAllAlbumsResponse.data)
      .mockResolvedValueOnce(data.getAllAlbumsResponse.data)
      .mockImplementationOnce(() => ({
        count: jest
          .fn()
          .mockResolvedValueOnce(data.getAllAlbumsResponse.data.length),
      })),
    findOne: jest.fn().mockResolvedValueOnce(data.getAlbum.data),
    deleteOne: jest.fn().mockResolvedValue(data.albumDeletedResponse.data),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [PersistenceModule],
    })
      .overrideProvider(getModelToken('Album'))
      .useValue(mockRepository)
      .compile();

    albumRepository = module.get<AlbumRepository>(AlbumRepository);
  });

  describe('All methods', () => {
    it('should create an album', async () => {
      const result = await albumRepository.createAlbum(data.createAlbumRequest);
      expect(result).toEqual(data.albumCreatedResponse.data);
      expect(mockRepository.create).toBeCalledTimes(1);
    });

    it('should update an album', async () => {
      const result = await albumRepository.updateAlbum(
        data.updateAlbumRequest.param,
        data.updateAlbumRequest.body,
      );
      expect(result).toEqual(data.albumUpdatedResponse.data);
      expect(mockRepository.updateOne).toBeCalledTimes(1);
    });

    it('should return an array of albums', async () => {
      const result = await albumRepository.getAlbums();
      expect(result).toEqual(data.getAllAlbumsResponse.data);
      expect(mockRepository.find).toBeCalledTimes(1);
    });

    it('should return an album', async () => {
      const result = await albumRepository.getAlbum('637c4c2a2b7c454fc5ba79e6');
      expect(result).toEqual(data.getAlbum.data);
      expect(mockRepository.findOne).toBeCalledTimes(1);
    });

    it('should delete an album', async () => {
      const result = await albumRepository.deleteAlbum(
        data.deleteAlbumRequest.param,
      );
      expect(result).toEqual(data.albumDeletedResponse.data);
      expect(mockRepository.deleteOne).toBeCalledTimes(1);
    });

    it('should return an array of albums by query', async () => {
      const result = await albumRepository.findBy({});
      expect(result).toEqual(data.getAllAlbumsResponse.data);
      expect(mockRepository.find).toBeCalledTimes(2);
    });

    it('should return the number of albums by query', async () => {
      const result = await albumRepository.countBy({});
      expect(result).toEqual(data.getAllAlbumsResponse.data.length);
      expect(mockRepository.find).toBeCalledTimes(3);
    });
  });
});
