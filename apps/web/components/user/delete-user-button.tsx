"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { deleteUser } from "@/server/users";

type Props = {
  id: number;
};

export default function DeleteUserButton({ id }: Props) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const handleDelete = async (id: number) => {
    mutation.mutate(id);
  };

  return (
    <Button
      onClick={() => handleDelete(id)}
      className="py-1 cursor-pointer"
      variant="destructive"
    >
      Delete
    </Button>
  );
}
