import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
  IsIn,
} from 'class-validator';
import { PromptsFilterDTO } from './prompts-filter.dto';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetPromptsDTO {
  @ApiPropertyOptional({
    description: 'The filter object',
    example: {
      conversation_id: '123e4567-e89b-12d3-a456-426614174000',
      policy_id: '123e4567-e89b-12d3-a456-426614174000',
    },
    type: PromptsFilterDTO,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PromptsFilterDTO)
  filter?: PromptsFilterDTO;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsString()
  @IsIn(['llm_responses'], { message: 'Include must be either llm_responses' })
  include?: 'llm_responses';
}
