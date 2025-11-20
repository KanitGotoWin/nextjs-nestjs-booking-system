import BookingForm from "@/components/bookings/booking-form";
import UserTitle from "@/components/ui/user-title";

export default async function Home() {
  return (
    <>
      <div>
        <UserTitle title="Book your ticket" />
      </div>
      <div className="mt-5 flex justify-center">
        <BookingForm />
      </div>
    </>
  );
}
