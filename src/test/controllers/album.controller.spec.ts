import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from '../../services/album.service';
import { AlbumController } from '../../controllers/album.controller';
import * as mockup from '../data/mockups.json';

describe('AlbumController', () => {
  let albumController: AlbumController;
  let albumService: AlbumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlbumController],
      providers: [
        {
          provide: AlbumService,
          useValue: {
            getAlbums: jest.fn().mockReturnValue(mockup.getAllAlbumsResponse),
            getAlbum: jest.fn().mockReturnValue(mockup.getAlbum),
            createAlbum: jest.fn().mockReturnValue(mockup.albumCreatedResponse),
            updateAlbum: jest.fn().mockReturnValue(mockup.albumUpdatedResponse),
            deleteAlbum: jest.fn().mockReturnValue(mockup.albumDeletedResponse),
          },
        },
      ],
    }).compile();

    albumService = module.get<AlbumService>(AlbumService);
    albumController = module.get<AlbumController>(AlbumController);
    jest.clearAllMocks();
  });

  describe('getAlbums', () => {
    it('should return an array of albums', async () => {
      const result = await albumController.getAllAlbums();
      expect(result).toEqual(mockup.getAllAlbumsResponse);
      expect(albumService.getAlbums).toBeCalledTimes(1);
    });
  });

  describe('getAlbum', () => {
    it('should return an album', async () => {
      const result = await albumController.getAlbumById(
        '637c4c2a2b7c454fc5ba79e6',
      );
      expect(result).toEqual(mockup.getAlbum);
      expect(albumService.getAlbum).toBeCalledTimes(1);
    });
  });

  describe('createAlbum', () => {
    it('should create an album', async () => {
      const result = await albumController.createAlbum(
        mockup.createAlbumRequest,
      );
      expect(result).toEqual(mockup.albumCreatedResponse);
      expect(albumService.createAlbum).toBeCalledTimes(1);
    });
  });

  describe('updateAlbum', () => {
    it('should update an album', async () => {
      const result = await albumController.updateAlbum(
        mockup.updateAlbumRequest.param,
        mockup.updateAlbumRequest.body,
      );
      expect(result).toEqual(mockup.albumUpdatedResponse);
      expect(albumService.updateAlbum).toBeCalledTimes(1);
    });
  });

  describe('deleteAlbum', () => {
    it('should delete an album', async () => {
      const result = await albumController.deleteAlbum(
        mockup.deleteAlbumRequest.param,
      );
      expect(result).toEqual(mockup.albumDeletedResponse);
      expect(albumService.deleteAlbum).toBeCalledTimes(1);
    });
  });
});
