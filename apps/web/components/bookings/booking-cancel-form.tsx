"use client";

import { useState } from "react";
import BookingCancelButton from "./booking-cancel-button";
import BookingInput from "./booking-input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckIcon } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { deleteBooking } from "@/server/bookings";

export default function BookingForm() {
  const [email, setEmail] = useState("");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      setEmail("");
      toast.success(`การจองถูกยกเลิกแล้ว`, {
        icon: <CheckIcon />,
      });
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        let message = error.response?.data?.message;

        if (Array.isArray(message)) {
          message = message[0];
        }

        if (status === 404) {
          toast.error(message || "Please check your email again.");
          return;
        }

        if (status === 500) {
          toast.error("Internal server error");
          return;
        }

        toast.error(message || "Something went wrong");
        return;
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Internal server error");
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    mutation.mutate(email);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <BookingInput
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <BookingCancelButton
        className="mt-3 text-xl"
        isLoading={mutation.isPending}
      >
        Confirm cancel
      </BookingCancelButton>
    </form>
  );
}
