import { User } from "@repo/types";
import { getUsers } from "../server/users";
import RegisterForm from "@/components/user/register-form";
import UserList from "@/components/user/user-list";

export default async function Home() {
  const users: User[] = await getUsers();

  return (
    <div className="container mx-auto">
      <div>
        <UserList />
      </div>
      <div className="mt-5 flex justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}
