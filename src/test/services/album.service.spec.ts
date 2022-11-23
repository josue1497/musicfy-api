import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from '../../services/album.service';
import { AlbumController } from '../../controllers/album.controller';
import * as mockup from '../data/mockups.json';
import { AlbumRepository } from '../../infraestructure/persistence/repositories/album.repository';
import {
  NotFoundException,
  ConflictException,
  NotAcceptableException,
} from '@nestjs/common';

describe('AlbumService', () => {
  let albumService: AlbumService;
  let albumRepository: AlbumRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      //   controllers: [AlbumController],
      providers: [
        {
          provide: AlbumRepository,
          useValue: {
            getAlbums: jest
              .fn()
              .mockReturnValue(mockup.getAllAlbumsResponse.data),
            getAlbum: jest.fn().mockReturnValue(mockup.getAlbum.data),
            createAlbum: jest
              .fn()
              .mockReturnValue(mockup.albumCreatedResponse.data),
            updateAlbum: jest
              .fn()
              .mockReturnValue(mockup.albumUpdatedResponse.data),
            deleteAlbum: jest
              .fn()
              .mockReturnValue(mockup.albumDeletedResponse.data),
            findBy: jest.fn().mockReturnValue(mockup.getAllAlbumsResponse.data),
            countBy: jest
              .fn()
              .mockReturnValue(mockup.getAllAlbumsResponse.data.length),
          },
        },
        AlbumService,
      ],
    }).compile();

    albumRepository = module.get<AlbumRepository>(AlbumRepository);
    albumService = module.get<AlbumService>(AlbumService);
    jest.clearAllMocks();
  });

  describe('getAlbums', () => {
    it('should return an array of albums', async () => {
      const result = await albumService.getAlbums();
      expect(result).toEqual(mockup.getAllAlbumsResponse);
      expect(albumRepository.getAlbums).toBeCalledTimes(1);
    });
  });

  describe('getAlbum', () => {
    it('should return an album', async () => {
      const result = await albumService.getAlbum('637c4c2a2b7c454fc5ba79e6');
      expect(result).toEqual(mockup.getAlbum);
      expect(albumRepository.getAlbum).toBeCalledTimes(1);
    });

    it("should throw Not found exception if album doesn't exist", async () => {
      jest.spyOn(albumRepository, 'getAlbum').mockReturnValue(null);
      try {
        await albumService.getAlbum('637c4c2a2b7c454fc5ba79e6');
      } catch (error) {
        expect(error.message).toEqual('Album not found');
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('createAlbum', () => {
    it('should create an album', async () => {
      jest.spyOn(albumRepository, 'findBy').mockResolvedValue([]);
      const result = await albumService.createAlbum(mockup.createAlbumRequest);
      expect(result).toEqual(mockup.albumCreatedResponse);
      expect(albumRepository.createAlbum).toBeCalledTimes(1);
    });

    it('should throw Conflict exception if album already exists', async () => {
      jest
        .spyOn(albumRepository, 'findBy')
        .mockResolvedValue([mockup.albumCreatedResponse.data]);
      try {
        await albumService.createAlbum(mockup.createAlbumRequest);
      } catch (error) {
        expect(error.message).toEqual(
          'There is an album whit this information',
        );
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('should throw Not Acceptable exception if album table is full', async () => {
      jest.spyOn(albumRepository, 'findBy').mockResolvedValue([]);
      jest.spyOn(albumRepository, 'countBy').mockResolvedValue(20);
      try {
        await albumService.createAlbum(mockup.createAlbumRequest);
      } catch (error) {
        expect(error.message).toEqual('The album database is full right now.');
        expect(error).toBeInstanceOf(NotAcceptableException);
      }
    });
  });

  describe('updateAlbum', () => {
    it('should update an album', async () => {
      const result = await albumService.updateAlbum(
        mockup.updateAlbumRequest.param,
        mockup.updateAlbumRequest.body,
      );
      expect(result).toEqual(mockup.albumUpdatedResponse);
      expect(albumRepository.updateAlbum).toBeCalledTimes(1);
    });

    it("should throw Not found exception if album doesn't exist", async () => {
      jest.spyOn(albumRepository, 'getAlbum').mockReturnValue(null);
      try {
        await albumService.updateAlbum(
          mockup.updateAlbumRequest.param,
          mockup.updateAlbumRequest.body,
        );
      } catch (error) {
        expect(error.message).toEqual('Album not found');
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteAlbum', () => {
    it('should delete an album', async () => {
      const result = await albumService.deleteAlbum(
        mockup.deleteAlbumRequest.param,
      );
      expect(result).toEqual(mockup.albumDeletedResponse);
      expect(albumRepository.deleteAlbum).toBeCalledTimes(1);
    });
  });

  //   describe('createAlbum', () => {
  //     it('should create an album', async () => {
  //       const result = await albumController.createAlbum(
  //         mockup.createAlbumRequest,
  //       );
  //       expect(result).toEqual(mockup.albumCreatedResponse);
  //       expect(albumService.createAlbum).toBeCalledTimes(1);
  //     });
  //   });

  //   describe('updateAlbum', () => {
  //     it('should update an album', async () => {
  //       const result = await albumController.updateAlbum(
  //         mockup.updateAlbumRequest.param,
  //         mockup.updateAlbumRequest.body,
  //       );
  //       expect(result).toEqual(mockup.albumUpdatedResponse);
  //       expect(albumService.updateAlbum).toBeCalledTimes(1);
  //     });
  //   });

  //   describe('deleteAlbum', () => {
  //     it('should delete an album', async () => {
  //       const result = await albumController.deleteAlbum(
  //         mockup.deleteAlbumRequest.param,
  //       );
  //       expect(result).toEqual(mockup.albumDeletedResponse);
  //       expect(albumService.deleteAlbum).toBeCalledTimes(1);
  //     });
  //   });
});
