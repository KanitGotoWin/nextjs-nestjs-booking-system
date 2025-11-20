"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { getCapacity, updateBookingConfig } from "@/server/booking-configs";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function CapacityForm() {
  const [capacityValue, setCapacityValue] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(true);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCapacity() {
      let capacity: string = "0";
      try {
        capacity = await getCapacity();
      } finally {
        setLoading(false);
      }
      setCapacityValue(capacity);
    }

    fetchCapacity();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!capacityValue) {
      toast.error("Capacity can't be empty");
      return;
    }
    const capacityInt = Number(capacityValue);

    if (isNaN(capacityInt) || capacityInt < 0) {
      toast.error("Please enter valid capacity");
      return;
    }

    setIsDisabled(true);
    try {
      await updateBookingConfig("capacity", {
        value: capacityValue.toString(),
      });
      toast.success("Capacity updated successfully!");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        let message = error.response?.data?.message;

        if (Array.isArray(message)) {
          message = message[0];
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
    } finally {
      setIsDisabled(false);
    }
  };

  if (loading)
    return (
      <div className="p-5 flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-sm bg-white shadow-sm rounded-xl p-6 border border-gray-200">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-700">
            Max Ticket Booking Capacity
          </label>
          <Input
            type="number"
            value={capacityValue}
            onChange={(e) => setCapacityValue(e.target.value)}
            placeholder="Enter new capacity"
            className="bg-gray-50"
          />
          <Button
            disabled={isDisabled}
            type="submit"
            className="w-full bg-gray-900 hover:bg-black text-white rounded-lg cursor-pointer"
          >
            {isDisabled ? <><Spinner />Updating...</> : <>Update</>}
          </Button>
        </form>
      </div>
    </div>
  );
}
