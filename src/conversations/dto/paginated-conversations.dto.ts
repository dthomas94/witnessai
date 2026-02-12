import { ConversationEntity } from '../entities/conversation.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedConversationsResponseDTO {
  @ApiProperty({
    description: 'The conversations',
    type: [ConversationEntity],
  })
  conversations: ConversationEntity[];

  @ApiProperty({
    description: 'The total number of conversations',
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
