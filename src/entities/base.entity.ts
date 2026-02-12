import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsNumber,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class BaseEntity {
  @ApiProperty({
    description: 'The UUID of the entity',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'The creation date of the entity',
    example: '2023-01-01T00:00:00.000Z',
  })
  @IsDateString()
  created: string;

  @ApiProperty({
    description: 'The update date of the entity',
    example: '2023-01-01T00:00:00.000Z',
  })
  @IsDateString()
  updated: string;

  @ApiProperty({
    description: 'The UUID of the conversation',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  conversation_id: string;

  @ApiProperty({
    description: 'The UUID of the policy',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  policy_id: string;

  @ApiProperty({
    description: 'The risk score of the entity',
    example: 0,
  })
  @IsNumber()
  @Min(0)
  @Max(3)
  risk_score: number;

  @ApiProperty({
    description: 'The action of the entity',
    example: 'none',
    type: 'string',
  })
  @IsIn(['none', 'blocked'])
  action: 'none' | 'blocked';
}
