"use client";

import { getUsers } from "@/server/users";
import { User } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../ui/spinner";
import DeleteUserButton from "./delete-user-button";

type Props = {
  title?: string;
};

export default function UserList({ title = "User List" }: Props) {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading)
    return (
      <div className="p-5 flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <div className="text-2xl font-bold text-sky-800 text-center my-10">
        {title}
      </div>
      <div className="grid grid-cols-2 gap-1">
        {users &&
          users.map((user: User) => (
            <div className="grid grid-cols-2 gap-4" key={user.id}>
              <div>
                {user.id}.{user.name} - {user.email}
              </div>
              <div className="my-1">
                <DeleteUserButton id={+user.id} />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
