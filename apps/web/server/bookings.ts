import {
  CreateBookingDto,
  CreateBookingResponseDto,
  DeleteBookingResponseDto,
} from "@repo/types";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/bookings`;

export async function getBookings() {
  try {
    const res = await axios.get(`${API_URL}`);

    if (!res.status) {
      return [];
    }

    return res.data;
  } catch {
    return [];
  }
}

export async function createBooking(
  CreateBookingDto: CreateBookingDto
): Promise<CreateBookingResponseDto> {
  return await axios.post(`${API_URL}`, CreateBookingDto);
}

export async function deleteBooking(
  email: string
): Promise<DeleteBookingResponseDto> {
  return await axios.delete(`${API_URL}/${email}`);
}
