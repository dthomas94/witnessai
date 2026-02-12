import { ApiProperty } from '@nestjs/swagger';
import { LLMResponseEntity } from './llm-response.entity';
import { BaseEntity } from 'src/entities/base.entity';
import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PromptEntity extends BaseEntity {
  @ApiProperty({
    description: 'The text of the prompt',
    example: 'How do I implement authentication?',
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    description: 'The LLM responses of the prompt',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => LLMResponseEntity)
  llm_responses?: LLMResponseEntity[];
}
