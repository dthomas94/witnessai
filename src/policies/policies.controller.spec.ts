import { Test, TestingModule } from '@nestjs/testing';
import { PoliciesController } from './policies.controller';
import { HttpModule } from '@nestjs/axios';

describe('PoliciesController', () => {
  let controller: PoliciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliciesController],
      imports: [HttpModule],
    }).compile();

    controller = module.get<PoliciesController>(PoliciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
