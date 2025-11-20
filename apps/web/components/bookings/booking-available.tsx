"use client";

import { getBookings } from "@/server/bookings";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../ui/spinner";

export default function BookingAvailable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  if (isLoading)
    return (
      <div className="p-5 flex items-center justify-center">
        <Spinner />
      </div>
    );

  if (error) return <p className="text-gray-400">N/A</p>;

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-md p-4 text-center border border-gray-200">
      <p className="text-gray-500 text-sm">Available Seats</p>
      <p className="text-2xl font-semibold text-gray-900">
        {data.availableSeats}
      </p>
    </div>
  );
}
