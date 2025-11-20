"use client";

import { getBookings } from "@/server/bookings";
import { Booking } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../ui/spinner";

export default function BookingList() {
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

  if (error) return <p>Failed to load bookings</p>;

  return (
    <>
      {data.bookings.length === 0 ? (
        <p className="text-gray-500">ยังไม่มีผู้จอง</p>
      ) : (
        <ul className="space-y-2">
          {data.bookings.map((b: Booking, i: number) => (
            <li key={i} className="p-2 border rounded-md">
              <p>
                <strong>Name:</strong> {b.name}
              </p>
              <p>
                <strong>Email:</strong> {b.email}
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
