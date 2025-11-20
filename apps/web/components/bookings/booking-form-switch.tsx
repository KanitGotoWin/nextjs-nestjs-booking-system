"use client";

import { FC } from "react";

interface BookingFormSwitchProps {
  showCancelForm: boolean;
  setShowCancelForm: (value: boolean) => void;
}

const BookingFormSwitch: FC<BookingFormSwitchProps> = ({
  showCancelForm,
  setShowCancelForm,
}) => {
  return (
    <div className="flex justify-center">
      <div
        className="relative w-[140px] h-8 bg-gray-300 rounded-full cursor-pointer flex items-center"
        onClick={() => setShowCancelForm(!showCancelForm)}
      >
        <div
          className={`absolute top-0 left-0 w-1/2 h-full bg-orange-400 rounded-full shadow-md transition-transform ${
            showCancelForm ? "translate-x-full" : "translate-x-0"
          }`}
        ></div>

        <span
          className={`w-1/2 text-center z-10 text-sm font-medium transition-colors px-2 ${
            showCancelForm ? "text-gray-700" : "text-white"
          }`}
        >
          Booking
        </span>
        <span
          className={`w-1/2 text-center z-10 text-sm font-medium transition-colors px-2 ${
            showCancelForm ? "text-white" : "text-gray-700"
          }`}
        >
          Cancel
        </span>
      </div>
    </div>
  );
};

export default BookingFormSwitch;
