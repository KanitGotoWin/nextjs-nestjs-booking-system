"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "../ui/button";

interface BookingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}

export default function BookingButton({
  children,
  isLoading = false,
  className = "",
  ...props
}: BookingButtonProps) {
  return (
    <Button
      className={`text-gray-600 bg-orange-300 hover:bg-orange-400 hover:text-white font-medium rounded-full duration-250 py-8 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {children}
    </Button>
  );
}
