"use client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { toast } from "sonner";

export function useBookingSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL, {
      transports: ["websocket"],
    });

    socket.on("reRenderBookings", () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    });

    socket.on("bookingFull", () => {
      toast.info("ขณะนี้เต็มแล้ว");
    });

    socket.on("bookingAvailable", () => {
      toast.info("มีที่นั่งว่างแล้ว");
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);
}
