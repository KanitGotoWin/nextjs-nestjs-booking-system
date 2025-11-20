"use client";
import { useBookingSocket } from "@/hooks/useBookingSocket";

export default function BookingSocketWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useBookingSocket();
  return <>{children}</>;
}
