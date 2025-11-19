import { Test, TestingModule } from '@nestjs/testing';
import { BookingConfigsService } from './booking-configs.service';

describe('BookingConfigsService', () => {
  let service: BookingConfigsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingConfigsService],
    }).compile();

    service = module.get<BookingConfigsService>(BookingConfigsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
