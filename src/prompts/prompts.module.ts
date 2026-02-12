import { Module } from '@nestjs/common';
import { PromptsController } from './prompts.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PromptsController],
})
export class PromptsModule {}
