import { Test, TestingModule } from '@nestjs/testing';
import { WarriorsController } from './warriors.controller';

describe('Warriors Controller', () => {
  let controller: WarriorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarriorsController],
    }).compile();

    controller = module.get<WarriorsController>(WarriorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
