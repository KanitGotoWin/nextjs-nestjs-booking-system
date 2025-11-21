import { cookies } from "next/headers";
import Navbar from "./navbar";

export default async function Header() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  return (
    <header>
      <Navbar isAuthenticated={!!accessToken} />
    </header>
  );
}
