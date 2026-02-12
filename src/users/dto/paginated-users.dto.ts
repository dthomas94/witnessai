import { UserEntity } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedUsersResponseDTO {
  @ApiProperty({
    description: 'The users',
    type: [UserEntity],
  })
  users: UserEntity[];

  @ApiProperty({
    description: 'The total number of users',
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
