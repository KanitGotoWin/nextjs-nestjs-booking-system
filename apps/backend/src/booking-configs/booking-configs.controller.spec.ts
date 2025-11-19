import { Test, TestingModule } from '@nestjs/testing';
import { BookingConfigsController } from './booking-configs.controller';
import { BookingConfigsService } from './booking-configs.service';

describe('BookingConfigsController', () => {
  let controller: BookingConfigsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingConfigsController],
      providers: [BookingConfigsService],
    }).compile();

    controller = module.get<BookingConfigsController>(BookingConfigsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
