import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class BasicRequestParamsDTO {
  @ApiPropertyOptional({
    description: 'The limit of the items per page',
    example: 100,
  })
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number;

  @ApiPropertyOptional({
    description: 'The page number',
    example: 1,
  })
  @IsInt()
  @Min(1)
  page: number;
}
