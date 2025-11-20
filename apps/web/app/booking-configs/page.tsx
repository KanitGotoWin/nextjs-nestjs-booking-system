import CapacityForm from "@/components/booking-configs/capacity-form";
import UserTitle from "@/components/ui/user-title";

export default function page() {
  return (
    <>
      <div className="mt-8">
        <UserTitle title="Booking Configuration" />
      </div>
      <CapacityForm />;
    </>
  );
}
