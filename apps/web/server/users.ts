import { CreateUserDto } from "@repo/types";
import axios from "axios";

const API_URL = "http://localhost:5005/user";

export async function getUsers() {
  try {
    const res = await axios.get(`${API_URL}`);

    if (!res.status) {
      return [];
    }

    return res.data;
  } catch (error) {
    return [];
  }
}

export async function createUser(createUserDto: CreateUserDto) {
  return await axios.post(`${API_URL}`, createUserDto);
}

export async function deleteUser(id: number){
  return await axios.delete(`${API_URL}/${id}`);
}