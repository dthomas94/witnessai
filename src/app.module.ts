import { Module } from '@nestjs/common';
import { ConversationsModule } from './conversations/conversations.module';
import { PromptsModule } from './prompts/prompts.module';
import { UsersModule } from './users/users.module';
import { PoliciesModule } from './policies/policies.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConversationsModule,
    PromptsModule,
    UsersModule,
    PoliciesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
  ],
})
export class AppModule {}
