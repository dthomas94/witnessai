import { IsIn, IsOptional } from 'class-validator';

export class UsersFilterDTO {
  @IsOptional()
  @IsIn([0, 1], { message: 'vip must be 0 or 1' })
  vip?: 0 | 1;
}
