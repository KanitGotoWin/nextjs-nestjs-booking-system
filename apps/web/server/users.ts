import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/user`;

export async function getUsers() {
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