import { ApiProperty } from '@nestjs/swagger';
import { PolicyEntity } from '../entities/policy.entity';

export class PaginatedPoliciesResponseDto {
  @ApiProperty({
    type: [PolicyEntity],
    description: 'List of policies',
  })
  policies: PolicyEntity[];

  @ApiProperty({ description: 'Total number of items', example: 100 })
  total: number;

  @ApiProperty({ description: 'Current page number', example: 1 })
  page: number;

  @ApiProperty({ description: 'Items per page', example: 10 })
  limit: number;

  @ApiProperty({ description: 'Offset for pagination', example: 0 })
  offset: number;
}
