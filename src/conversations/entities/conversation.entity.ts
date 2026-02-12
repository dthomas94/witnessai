import { ApiProperty } from '@nestjs/swagger';

export class ConversationEntity {
  @ApiProperty({
    description: 'The UUID of the conversation',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The title of the conversation',
    example: 'Example Conversation',
  })
  title: string;

  @ApiProperty({
    description: 'The UUID of the user',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  user_id: string;

  @ApiProperty({
    description: 'The creation date of the conversation',
    example: '2023-01-01T00:00:00.000Z',
  })
  created: string;

  @ApiProperty({
    description: 'The update date of the conversation',
    example: '2023-01-01T00:00:00.000Z',
  })
  updated: string;
}
