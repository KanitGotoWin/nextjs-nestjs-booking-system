import React from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle } from "lucide-react";

export default function MapFailAlert() {
  return (
    <div className="w-full flex justify-center mt-12">
      <div className="w-full max-w-md">
        <Alert variant="default" className="py-12 flex justify-center text-md">
          <AlertCircle />
          <AlertDescription>Unable to load the map.</AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
