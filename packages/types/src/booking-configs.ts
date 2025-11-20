export interface UpdateBookingConfigDto {
  value: string;
}

export interface UpdateBookingConfigResponseDto {
  id: number;
  key: string;
  value: string;
  createdAt: Date;
  updatedAt: Date | null;
}
