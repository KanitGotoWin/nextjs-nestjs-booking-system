"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "../ui/button";

interface BookingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}

export default function BookingCancelButton({
  children,
  isLoading = false,
  className = "",
  ...props
}: BookingButtonProps) {
  return (
    <Button
      className={`text-white bg-red-400 hover:bg-red-500 hover:text-white font-medium rounded-full duration-250 py-8 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {children}
    </Button>
  );
}
