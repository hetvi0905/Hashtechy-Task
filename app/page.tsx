"use client";
import { useAuth } from "../hooks/use-auth";
import LoginForm from "./components/LoginForm";

export default function Page() {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      {isLoggedIn ? (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-4xl font-bold">Welcome to the Products Page!</h1>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}
