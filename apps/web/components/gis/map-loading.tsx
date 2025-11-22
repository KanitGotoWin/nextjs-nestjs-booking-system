import { Spinner } from "../ui/spinner";

export default function MapLoading() {
  return (
    <div className="flex items-center justify-center h-[95vh] space-x-2 text-gray-500">
      <Spinner className="w-12 h-12" />
      <span className="text-sm">Loading map...</span>
    </div>
  );
}
