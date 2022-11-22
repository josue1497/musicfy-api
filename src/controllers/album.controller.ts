import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AlbumDTO,
  AlbumResponseDTO,
  DeletedResponse,
  UpdateResponse,
} from '../core/dto/album.dto';
import {
  ConflictExceptionDTO,
  NotAcceptableExceptionDTO,
  NotFoundExceptionDTO,
} from '../core/errors/errors.dto';
import { CoreResponse } from '../core/types.core';
import { AlbumService } from '../services/album.service';

@Controller('v1/album')
@ApiTags('Album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get('')
  @ApiOkResponse({
    description: 'Get all albums in the database.',
    type: Array<AlbumResponseDTO>,
  })
  async getAllAlbums(): Promise<CoreResponse<AlbumResponseDTO[]>> {
    return await this.albumService.getAlbums();
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Get album in the database filter by ID.',
    type: AlbumResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    type: NotFoundExceptionDTO,
  })
  async getAlbumById(
    @Param('id') id: string,
  ): Promise<CoreResponse<AlbumResponseDTO>> {
    return await this.albumService.getAlbum(id);
  }

  @Post('')
  @ApiOkResponse({
    description: 'The album has been successfully created.',
    type: AlbumResponseDTO,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    type: NotFoundExceptionDTO,
  })
  @ApiConflictResponse({
    description: 'Not found',
    type: ConflictExceptionDTO,
  })
  @ApiNotAcceptableResponse({
    description: 'Not Acceptable',
    type: NotAcceptableExceptionDTO,
  })
  async createAlbum(
    @Body() data: AlbumDTO,
  ): Promise<CoreResponse<AlbumResponseDTO>> {
    return await this.albumService.createAlbum(data);
  }

  @Put('/:id')
  @ApiOkResponse({
    description: 'The album has been successfully created.',
    type: UpdateResponse,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    type: NotFoundExceptionDTO,
  })
  async updateAlbum(
    @Param('id') id: string,
    @Body() data: AlbumDTO,
  ): Promise<CoreResponse<UpdateResponse>> {
    return await this.albumService.updateAlbum(id, data);
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: 'The album has been successfully created.',
    type: DeletedResponse,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    type: NotFoundExceptionDTO,
  })
  async deleteAlbum(
    @Param('id') id: string,
  ): Promise<CoreResponse<DeletedResponse>> {
    return await this.albumService.deleteAlbum(id);
  }
}
