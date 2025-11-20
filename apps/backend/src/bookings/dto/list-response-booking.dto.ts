import { ApiProperty } from '@nestjs/swagger';
import { BookingItemDto } from './booking-item.dto';
import { ListResponseBookingStatus } from './list-response-booking-status';

export class ListResponseBookingDto {
  @ApiProperty({
    type: [BookingItemDto],
    example: [
      { name: 'Alice', email: 'alice@example.com', createdAt: new Date() },
      { name: 'Bob', email: 'bob@example.com', createdAt: new Date() },
    ],
  })
  bookings: BookingItemDto[];

  @ApiProperty({ example: 8 })
  availableSeats: number;

  @ApiProperty({ example: 'available', enum: ListResponseBookingStatus })
  status: ListResponseBookingStatus;
}
