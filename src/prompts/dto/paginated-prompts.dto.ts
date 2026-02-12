import { ApiProperty } from '@nestjs/swagger';
import { PromptEntity } from '../entities/prompt.entity';

export class PaginatedPromptsResponseDTO {
  @ApiProperty({
    description: 'The prompts',
    type: [PromptEntity],
  })
  prompts: PromptEntity[];

  @ApiProperty({
    description: 'The total number of prompts',
    type: Number,
  })
  total: number;

  @ApiProperty({
    description: 'The page number',
    type: Number,
  })
  page: number;

  @ApiProperty({
    description: 'The limit number',
    type: Number,
  })
  limit: number;

  @ApiProperty({
    description: 'The offset number',
    type: Number,
  })
  offset: number;
}
