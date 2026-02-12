import { IsOptional, IsUUID } from 'class-validator';

export class ConversationFilterDTO {
  @IsOptional()
  @IsUUID()
  user_id?: string;
}
