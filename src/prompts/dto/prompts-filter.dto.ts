import { IsOptional, IsString } from 'class-validator';

export class PromptsFilterDTO {
  @IsOptional()
  @IsString()
  conversation_id?: string;

  @IsOptional()
  @IsString()
  policy_id?: string;
}
