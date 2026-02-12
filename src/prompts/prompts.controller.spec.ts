import { Test, TestingModule } from '@nestjs/testing';
import { PromptsController } from './prompts.controller';
import { HttpModule } from '@nestjs/axios';

describe('PromptsController', () => {
  let controller: PromptsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromptsController],
      imports: [HttpModule],
    }).compile();

    controller = module.get<PromptsController>(PromptsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
