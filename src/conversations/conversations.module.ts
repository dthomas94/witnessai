import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ConversationsController],
})
export class ConversationsModule {}
