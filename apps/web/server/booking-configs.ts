import {
  UpdateBookingConfigDto,
  UpdateBookingConfigResponseDto,
} from "@repo/types";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/booking-configs`;

export async function getCapacity(): Promise<string> {
  try {
    const res = await axios.get(`${API_URL}`);

    if (!res.status) {
      return "0";
    }

    return res.data;
  } catch {
    return "0";
  }
}

export async function updateBookingConfig(
  key: string,
  updateBookingConfigDto: UpdateBookingConfigDto
): Promise<UpdateBookingConfigResponseDto> {
  return await axios.patch(`${API_URL}/${key}`, updateBookingConfigDto);
}
