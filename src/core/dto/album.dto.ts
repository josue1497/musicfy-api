import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AlbumDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  artistName: string;

  @ApiProperty({ required: false })
  @IsString()
  artistLastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  albumName: string;

  @ApiProperty()
  @IsNotEmpty()
  albumYear: string;

  @ApiProperty({ required: false })
  @IsString()
  albumCover: string;
}

export class AlbumResponseDTO extends AlbumDTO {
  @ApiProperty()
  _id?: string;
}

export class UpdateResponse {
  @ApiProperty()
  @IsBoolean()
  acknowledged: boolean;
  @ApiProperty()
  @IsNumber()
  modifiedCount: number;
  @ApiProperty({ required: false })
  @IsNumber()
  upsertedId: any;
  @ApiProperty({ required: false })
  @IsNumber()
  upsertedCount: number;
  @ApiProperty({ required: false })
  @IsNumber()
  matchedCount: number;
}

export class DeletedResponse {
  @ApiProperty()
  @IsBoolean()
  acknowledged: boolean;
  @ApiProperty()
  @IsNumber()
  modifiedCount?: number;
}

export class AlbumListResponseDTO {}
