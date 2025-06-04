"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("loginEmail");
    const savedPassword = localStorage.getItem("loginPassword");

    if (savedEmail) {
      setValue("email", savedEmail);
    }
    if (savedPassword) {
      setValue("password", savedPassword);
    }
  }, [setValue]);

  const watchedValues = watch();

  useEffect(() => {
    if (watchedValues.email) {
      localStorage.setItem("loginEmail", watchedValues.email);
    }
    if (watchedValues.password) {
      localStorage.setItem("loginPassword", watchedValues.password);
    }
  }, [watchedValues]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      login(data.email);
      router.push("/products");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed!");
    }
  };

  return (
    <div className="h-screen  flex items-center justify-center">
      <div className="bg-[#3F3F3F] rounded-[2.4rem] px-[6.5rem] w-full max-w-[720px] h-[580px]">
        <h2 className="mt-[2.4rem] text-white text-[3.2rem] font-medium text-center">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-[8.2rem]">
          <div>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className="border-0 border-b-2 border-white text-white placeholder-gray-400 rounded-none focus:border-white focus:ring-0 focus:outline-none px-0 py-[1.3rem]"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-[#B08A26] text-[1.6rem] mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              id="password"
              type="password"
              {...register("password")}
              className="border-0 mt-[3.6rem] border-b-2 border-white text-white placeholder-gray-400 rounded-none focus:border-white focus:ring-0 focus:outline-none px-0 py-[1.3rem]"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-[#B08A26] text-[1.6rem] mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mt-[6.9rem] flex justify-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer bg-[#55B4C9] hover:bg-sky-600 text-white font-medium p-[2.4rem] text-[3.2rem] rounded w-full max-w-[296px]"
            >
              {isSubmitting ? "Signing in..." : "Go"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
