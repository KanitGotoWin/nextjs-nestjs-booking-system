import { useState } from "react";
import { Button } from "../ui/button";
import { logout } from "@/server/auth";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function LogoutButton() {
  const [disabled, setDisabled] = useState<boolean>(false);
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisabled(true);
    try {
      await logout();

      window.location.href = "/";
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        let message = error.response?.data?.message;

        if (Array.isArray(message)) {
          message = message[0];
        }

        if (status === 500) {
          toast.error("Internal server error");
          return;
        }

        toast.error(message || "Something went wrong");
        return;
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Internal server error");
      }
    } finally {
      setDisabled(false);
    }
  };
  return (
    <Button
      disabled={disabled}
      className="rounded-full cursor-pointer px-3"
      onClick={handleLogout}
      variant="destructive"
    >
      Logout
    </Button>
  );
}
