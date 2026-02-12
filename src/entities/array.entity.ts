import { ApiProperty } from '@nestjs/swagger';

export class ArrayEntity {
  @ApiProperty({
    description: 'The total number of items',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'The page number',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'The limit of items per page',
    example: 100,
  })
  limit: number;

  @ApiProperty({
    description: 'The offset of the items',
    example: 0,
  })
  offset: number;
}
