import { LoginDto } from "@repo/types";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

export async function login(loginDto: LoginDto): Promise<{ message: string }> {
  return await axios.post(`${API_URL}/login`, loginDto, {
    withCredentials: true,
  });
}

export async function logout(): Promise<void> {
  return await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
}
