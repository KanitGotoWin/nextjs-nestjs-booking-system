"use client";
import BookingFormTitle from "./booking-form-title";
import BookingForm from "./booking-form";
import BookingCancelForm from "./booking-cancel-form";
import { useState } from "react";
import BookingFormSwitch from "./booking-form-switch";
import BookingCancelFormTitle from "./booking-cancel-form-title";

export default function BookingSection() {
  const [showCancelForm, setShowCancelForm] = useState(false);

  return (
    <section
      className="relative h-[100vh] w-full bg-cover bg-center"
      style={{ backgroundImage: "url('/ticket3.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <div className="bg-gray-50 py-[3rem] px-[4rem] lg:px-[7.5rem] rounded-xl">
          <div className="mb-6">
            <BookingFormSwitch
              showCancelForm={showCancelForm}
              setShowCancelForm={setShowCancelForm}
            />
          </div>
          <div>
            {showCancelForm ? <BookingCancelFormTitle /> : <BookingFormTitle />}
          </div>
          <div className="w-full max-w-md mx-auto">
            {showCancelForm ? <BookingCancelForm /> : <BookingForm />}
          </div>
        </div>
      </div>
    </section>
  );
}
