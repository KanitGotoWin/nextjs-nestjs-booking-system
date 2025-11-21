"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { login } from "@/server/auth";
import { useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setDisabled(true);
    try {
      await login({ email, password });

      window.location.href = "/booking-list";
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
      setError(true);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md shadow-xl">
      <Card>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              className={
                error
                  ? "border-2 border-red-500 focus:border-red-500 focus:ring-red-500"
                  : ""
              }
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              className={
                error
                  ? "border-2 border-red-500 focus:border-red-500 focus:ring-red-500"
                  : ""
              }
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            disabled={disabled}
            type="submit"
            className="mt-2 w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 cursor-pointer"
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
