"use client";

import { getBookings } from "@/server/bookings";
import { Booking } from "@repo/types";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "../ui/spinner";
import BookingAvailable from "./booking-available";

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

  if (error) return <p className="text-red-500">Failed to load bookings</p>;

  return (
    <div className="flex flex-col items-center w-full space-y-6 px-3 md:px-0">
      {/* Available Seats Card */}
      <BookingAvailable />

      {/* Bookings List */}
      <div className="w-full max-w-3xl space-y-3">
        {data.bookings.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No booking yet.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.bookings.map((b: Booking, i: number) => (
              <li
                key={i}
                className="p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-900 font-semibold text-lg">
                    {b.name}
                  </h3>
                  <span className="text-gray-400 text-sm">
                    {new Date(b.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700">{b.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
