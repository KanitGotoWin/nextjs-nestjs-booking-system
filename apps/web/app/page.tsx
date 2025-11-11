import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import { User } from "@repo/types";
import { getUsers } from "../server/users";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const users: User[] = await getUsers();

  return (
    <div className="container mx-auto">
      <div className="text-2xl font-bold text-sky-800 text-center my-10">
        User List
      </div>
      {users &&
        users.map((user) => (
          <p key={user.id} className="text-xl">
            {user.id} - {user.name} - {user.email}
          </p>
        ))}

      <div className="mt-5 flex justify-center">
        <Button className="p-5">Add profit</Button>
      </div>
    </div>
  );
}
