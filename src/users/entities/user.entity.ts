import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class UserEntity {
  @ApiProperty({
    description: 'The UUID of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The VIP status of the user',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  vip: number;

  @ApiProperty({
    description: 'The creation date of the user',
    example: '2023-01-01T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  created: string;

  @ApiProperty({
    description: 'The update date of the user',
    example: '2023-01-01T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  updated: string;
}
