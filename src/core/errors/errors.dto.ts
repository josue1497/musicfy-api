import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ResponseExceptionDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ default: 200 })
  statusCode: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  message?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  error?: string;
}

export class NotFoundExceptionDTO extends ResponseExceptionDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ default: 404 })
  statusCode: number;
}

export class ConflictExceptionDTO extends ResponseExceptionDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ default: 409 })
  statusCode: number;
}

export class NotAcceptableExceptionDTO extends ResponseExceptionDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ default: 406 })
  statusCode: number;
}
