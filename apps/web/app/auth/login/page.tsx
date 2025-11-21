import LoginForm from "@/components/auth/login-form";
import LoginHeader from "@/components/auth/login-header";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div>
        <LoginHeader />
      </div>

      <div className="flex justify-center px-4">
        <LoginForm />
      </div>
    </div>
  );
}
