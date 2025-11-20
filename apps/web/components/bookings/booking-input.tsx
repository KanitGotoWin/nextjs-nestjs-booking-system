"use client";

import { InputHTMLAttributes } from "react";
import { Input } from "../ui/input";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function BookingInput({
  className = "",
  ...props
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <Input
        className={`rounded-full text-black p-6 !text-[1.1rem] font-light ${className} bg-gray-100 border-2 border-gray-300`}
        {...props}
      />
    </div>
  );
}
