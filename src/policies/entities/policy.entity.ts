import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString, IsUUID } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class PolicyEntity {
  @ApiProperty({
    description: 'The UUID of the policy',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'The name of the policy',
    example: 'Global AI Policy',
  })
  @IsString()
  @IsNotEmpty()
  policy_name: string;

  @ApiProperty({
    description: 'The version of the policy',
    example: 1523,
  })
  @IsNumber()
  @IsNotEmpty()
  policy_version: number;

  @ApiProperty({
    description: 'The creation date of the policy',
    example: '2023-01-01T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  created: string;

  @ApiProperty({
    description: 'The update date of the policy',
    example: '2023-01-01T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  updated: string;
}
