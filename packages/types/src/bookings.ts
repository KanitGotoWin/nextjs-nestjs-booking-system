export interface Booking {
  id: number;
  name: string;
  email: string;
  status: string;
  createdAt: string;
}

export interface CreateBookingDto {
    name: string;
    email: string;
}

export interface CreateBookingResponseDto {
    message: string;
}

export interface DeleteBookingResponseDto {
    message: string;
}