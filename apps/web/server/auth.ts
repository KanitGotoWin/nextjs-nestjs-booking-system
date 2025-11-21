import { LoginDto } from "@repo/types";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

export async function login(loginDto: LoginDto) {
  return await axios.post(`${API_URL}/login`, loginDto, {
    withCredentials: true,
  });
}

export async function logout() {
  return await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
}