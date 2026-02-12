import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from 'src/entities/base.entity';
export class LLMResponseEntity extends BaseEntity {
  @ApiProperty({
    description: 'The UUID of the prompt',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  prompt_id: string;

  @ApiProperty({
    description: 'The completion date of the LLM response',
    example: '2023-01-01T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  completed_at: string;

  @ApiProperty({
    description: 'The model of the LLM response',
    example: 'gpt-4.1-2025-04-14',
  })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    description: 'The output of the LLM response',

    type: 'object',
    additionalProperties: true,
    example: {
      type: 'message',
      content: [
        {
          type: 'output_text',
          text: "Here's how to implement authentication...",
        },
      ],
    },
  })
  @IsOptional()
  @IsObject()
  output: {
    type: 'message';
    content: {
      type: 'output_text';
      text: string;
    }[];
  } | null;
}
