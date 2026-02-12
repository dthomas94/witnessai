import { Module } from '@nestjs/common';
import { PoliciesController } from './policies.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [PoliciesController],
})
export class PoliciesModule {}
