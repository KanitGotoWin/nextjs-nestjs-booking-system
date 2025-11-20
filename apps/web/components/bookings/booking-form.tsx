"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "@/server/bookings";
import { toast } from "sonner";
import { TicketCheck} from "lucide-react";
import { AxiosError } from "axios";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      setName("");
      setEmail("");
      toast.success(`Your ticket has been booked.`, {
        icon: <TicketCheck />,
      });
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Internal server error");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Internal server error");
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({ name, email });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button disabled={mutation.isPending} className="hover:cursor-pointer">
        Book ticket
      </Button>
    </form>
  );
}
