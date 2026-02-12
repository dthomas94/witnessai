import {
  IsNumber,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ConversationFilterDTO } from './conversation-filter.dto';
import { Type } from 'class-transformer';

export class GetConversationsDTO {
  @ApiPropertyOptional({
    description: 'The filter object',
    example: {
      user_id: '123e4567-e89b-12d3-a456-426614174000',
    },
    type: ConversationFilterDTO,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ConversationFilterDTO)
  filter?: ConversationFilterDTO;
}
