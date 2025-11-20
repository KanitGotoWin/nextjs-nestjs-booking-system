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

  if (error) return <p>N/A</p>;

  return <>{data.availableSeats}</>;
}
