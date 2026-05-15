import { useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import img1 from "@/assets/images/signup1.webp";
import img2 from "@/assets/images/signup2.jpg";
import img3 from "@/assets/images/signup3.jpg";
import collageImg from "@/assets/images/signup1.webp";


const loginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().default(false),
});

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters"),
    agree: z.boolean().refine((v) => v === true, {
      message: "You must agree to the terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function BrandPanel({ isRegister }) {
  const title = isRegister ? "Create your next journey" : "Welcome back";
  const desc = isRegister
    ? "Join Lefago and explore destinations, reviews, and unforgettable experiences."
    : "Sign in to continue your travel experience with Lefago.";

  return (
    <div className="h-full w-full p-5">
      <div className="relative h-[calc(100vh-40px)] min-h-[760px] w-full overflow-hidden rounded-[42px] bg-[#0f0f0f] shadow-[0_30px_80px_rgba(0,0,0,0.25)]">

        {/* ===== COLLAGE ===== */}
        <div className="absolute inset-0">

          {/* LEFT */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: "polygon(0 0, 30% 0, 55% 100%, 0 100%)",
            }}
          >
            <img
              src={img1}
              className="h-full w-full object-cover scale-[1.15] object-[25%_50%]"
            />
          </div>

          {/* MIDDLE */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: "polygon(30% 0, 75% 0, 85% 100%, 55% 100%)",
            }}
          >
            <img
              src={img2}
              className="h-full w-full object-cover scale-[1.1] object-[55%_50%]"
            />
          </div>

          {/* RIGHT */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: "polygon(75% 0, 100% 0, 100% 100%, 85% 100%)",
            }}
          >
            <img
              src={img3}
              className="h-full w-full object-cover scale-[1.2] object-[80%_50%]"
            />
          </div>

          {/* ===== WHITE DIVIDER ===== */}
          <div
            className="absolute inset-0 bg-white"
            style={{
              clipPath: "polygon(29% 0, 31% 0, 56% 100%, 54% 100%)",
            }}
          />
          <div
            className="absolute inset-0 bg-white"
            style={{
              clipPath: "polygon(74% 0, 76% 0, 86% 100%, 84% 100%)",
            }}
          />

        </div>

        {/* ===== OVERLAY ===== */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.05)_40%,rgba(0,0,0,0.45)_100%)]" />

        {/* ===== LIGHT EFFECT ===== */}
        <div className="absolute -left-20 top-20 h-52 w-52 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-44 w-44 rounded-full bg-sky-300/20 blur-3xl" />

        {/* ===== TOP ===== */}
        <div className="absolute left-8 right-8 top-8 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black font-bold shadow">
              L
            </div>
            <span className="text-lg font-semibold">Lefago</span>
          </div>

          <div className="hidden md:block text-xs px-4 py-2 rounded-full bg-white/10 border border-white/30 backdrop-blur">
            Travel Platform
          </div>
        </div>

        {/* ===== TEXT ===== */}
        <div className="absolute bottom-8 left-8 right-8 text-white">
          <h3 className="text-[52px] font-bold leading-[1.05]">
            {title}
          </h3>

          <p className="mt-4 text-[15px] text-white/85 max-w-[480px]">
            {desc}
          </p>

          <div className="mt-8 flex justify-between items-end">
            <div>
              <p className="font-semibold">
                {isRegister ? "New adventure" : "Travel smarter"}
              </p>
              <p className="text-sm text-white/70">
                {isRegister
                  ? "Discover, share, and connect"
                  : "Your journey continues here"}
              </p>
            </div>

            <div className="flex gap-2">
              <div className="w-10 h-2 bg-white rounded-full" />
              <div className="w-2 h-2 bg-white/60 rounded-full" />
              <div className="w-2 h-2 bg-white/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthSplit() {
  const [isRegister, setIsRegister] = useState(false);

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },
  });

  const formTitle = useMemo(
    () => (isRegister ? "Create account" : "Welcome back"),
    [isRegister]
  );

  const formDesc = useMemo(
    () =>
      isRegister
        ? "Join Lefago and start your experience."
        : "Sign in to continue using Lefago.",
    [isRegister]
  );

  const onLoginSubmit = (values) => {
    console.log("login", values);
  };

  const onRegisterSubmit = (values) => {
    console.log("register", values);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#efefef]">
      {/* Desktop */}
      <div className="hidden min-h-screen w-full md:block">
        <div className="relative min-h-screen w-full">
          {/* Left animated visual */}
          <div
            className={`absolute inset-y-0 left-0 w-1/2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isRegister ? "translate-x-full" : "translate-x-0"
            }`}
          >
            <BrandPanel isRegister={isRegister} />
          </div>

          {/* Right animated form */}
          <div
            className={`absolute inset-y-0 left-0 w-1/2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isRegister ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex min-h-screen w-full items-center justify-center px-10 py-10 lg:px-14">
              <div className="w-full max-w-[520px]">
                <div className="mb-10 flex items-start justify-between">
                  <div>
                    <h2 className="text-[22px] font-bold tracking-tight text-neutral-800">
                      LEFAGO
                    </h2>
                    <p className="mt-1 text-sm text-neutral-500">
                      Travel • Review • Explore
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsRegister(false)}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        !isRegister
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-500 hover:text-neutral-800"
                      }`}
                    >
                      Sign in
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsRegister(true)}
                      className={`rounded-full px-4 py-2 text-sm transition ${
                        isRegister
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-500 hover:text-neutral-800"
                      }`}
                    >
                      Register
                    </button>
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/70 bg-white/70 p-8 shadow-[0_16px_50px_rgba(0,0,0,0.06)] backdrop-blur-sm">
                  <div className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tight text-black lg:text-[44px]">
                      {formTitle}
                    </h1>
                    <p className="mt-2 text-[15px] text-neutral-500">
                      {formDesc}
                    </p>
                  </div>

                  {!isRegister ? (
                    <Form {...loginForm}>
                      <form
                        onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                        className="space-y-5"
                      >
                        <FormField
                          control={loginForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm text-neutral-700">
                                Email
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your email"
                                  className="h-12 rounded-2xl border-neutral-200 bg-white px-4 text-sm shadow-none focus-visible:ring-2 focus-visible:ring-sky-200"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm text-neutral-700">
                                Password
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="Enter your password"
                                  className="h-12 rounded-2xl border-neutral-200 bg-white px-4 text-sm shadow-none focus-visible:ring-2 focus-visible:ring-sky-200"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex items-center justify-between pt-1 text-sm">
                          <FormField
                            control={loginForm.control}
                            name="remember"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center gap-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal text-neutral-700">
                                  Keep me logged in
                                </FormLabel>
                              </FormItem>
                            )}
                          />

                          <button
                            type="button"
                            className="text-sm text-sky-600 hover:underline"
                          >
                            Forgot password?
                          </button>
                        </div>

                        <div className="flex items-center gap-4 pt-1">
                          <div className="h-px flex-1 bg-neutral-200" />
                          <span className="text-sm text-neutral-400">or</span>
                          <div className="h-px flex-1 bg-neutral-200" />
                        </div>

                        <Button
                          type="button"
                          variant="outline"
                          className="h-12 w-full rounded-2xl border-neutral-200 bg-white text-sm text-neutral-800 hover:bg-neutral-50"
                        >
                          Continue with Google
                        </Button>

                        <Button
                          type="submit"
                          className="h-12 w-full rounded-full bg-[#6aa3d8] text-sm font-medium text-white shadow-[0_10px_24px_rgba(106,163,216,0.28)] hover:bg-[#5e96ca]"
                        >
                          Sign in
                        </Button>

                        <p className="pt-1 text-center text-sm text-neutral-600">
                          Don&apos;t have an account?{" "}
                          <button
                            type="button"
                            onClick={() => setIsRegister(true)}
                            className="font-medium text-sky-600 hover:underline"
                          >
                            Create one
                          </button>
                        </p>
                      </form>
                    </Form>
                  ) : (
                    <Form {...registerForm}>
                      <form
                        onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                        className="space-y-5"
                      >
                        <FormField
                          control={registerForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm text-neutral-700">
                                Full name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your full name"
                                  className="h-12 rounded-2xl border-neutral-200 bg-white px-4 text-sm shadow-none focus-visible:ring-2 focus-visible:ring-sky-200"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={registerForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm text-neutral-700">
                                Email
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="Enter your email"
                                  className="h-12 rounded-2xl border-neutral-200 bg-white px-4 text-sm shadow-none focus-visible:ring-2 focus-visible:ring-sky-200"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={registerForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm text-neutral-700">
                                  Password
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="password"
                                    placeholder="Password"
                                    className="h-12 rounded-2xl border-neutral-200 bg-white px-4 text-sm shadow-none focus-visible:ring-2 focus-visible:ring-sky-200"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={registerForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm text-neutral-700">
                                  Confirm
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="password"
                                    placeholder="Confirm"
                                    className="h-12 rounded-2xl border-neutral-200 bg-white px-4 text-sm shadow-none focus-visible:ring-2 focus-visible:ring-sky-200"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={registerForm.control}
                          name="agree"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start gap-3 space-y-0 pt-1">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div>
                                <FormLabel className="text-sm font-normal leading-5 text-neutral-700">
                                  I agree to the{" "}
                                  <span className="font-medium text-sky-600">
                                    Terms of Service
                                  </span>{" "}
                                  and{" "}
                                  <span className="font-medium text-sky-600">
                                    Privacy Policy
                                  </span>
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="h-12 w-full rounded-full bg-[#6aa3d8] text-sm font-medium text-white shadow-[0_10px_24px_rgba(106,163,216,0.28)] hover:bg-[#5e96ca]"
                        >
                          Create account
                        </Button>

                        <p className="pt-1 text-center text-sm text-neutral-600">
                          Already have an account?{" "}
                          <button
                            type="button"
                            onClick={() => setIsRegister(false)}
                            className="font-medium text-sky-600 hover:underline"
                          >
                            Sign in
                          </button>
                        </p>
                      </form>
                    </Form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="block w-full overflow-y-auto md:hidden">
        <div className="px-4 py-5">
          <div className="relative h-[260px] overflow-hidden rounded-[28px] bg-black shadow-lg">
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: "polygon(0 0, 47% 0, 65% 100%, 0 100%)" }}
            >
              <img
                src={collageImg}
                alt=""
                className="h-full w-full scale-[1.16] object-cover object-[20%_50%]"
              />
            </div>
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: "polygon(47% 0, 100% 0, 100% 44%, 70% 58%)" }}
            >
              <img
                src={collageImg}
                alt=""
                className="h-full w-full scale-[1.08] object-cover object-[58%_50%]"
              />
            </div>
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: "polygon(65% 100%, 70% 58%, 100% 44%, 100% 100%)" }}
            >
              <img
                src={collageImg}
                alt=""
                className="h-full w-full scale-[1.24] object-cover object-[88%_50%]"
              />
            </div>

            <div className="absolute inset-0 bg-black/28" />

            <div className="absolute left-5 top-5 text-white">
              <h2 className="text-lg font-semibold">Lefago</h2>
            </div>

            <div className="absolute bottom-5 left-5 right-5 text-white">
              <h3 className="text-3xl font-bold">
                {isRegister ? "Join Us" : "Welcome Back"}
              </h3>
              <p className="mt-1 text-sm text-white/85">
                {isRegister
                  ? "Create your account and start exploring"
                  : "Sign in to continue"}
              </p>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[430px] py-8">
            <div className="mb-8 flex justify-end">
              <Button
                type="button"
                onClick={() => setIsRegister((prev) => !prev)}
                className="rounded-full bg-[#6aa3d8] px-6 text-white hover:bg-[#5e96ca]"
              >
                {isRegister ? "Sign in" : "Register"}
              </Button>
            </div>

            {!isRegister ? (
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                  className="space-y-4"
                >
                  <h1 className="text-4xl font-bold text-black">Welcome Back</h1>
                  <p className="text-sm text-neutral-600">Welcome to LEFAGO</p>

                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Email"
                            className="h-12 rounded-2xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            className="h-12 rounded-2xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="remember"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          Keep me logged in
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  <Button className="h-12 w-full rounded-full bg-[#6aa3d8] text-white hover:bg-[#5e96ca]">
                    Login
                  </Button>

                  <p className="text-center text-sm text-neutral-600">
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsRegister(true)}
                      className="font-medium text-sky-600"
                    >
                      Sign up
                    </button>
                  </p>
                </form>
              </Form>
            ) : (
              <Form {...registerForm}>
                <form
                  onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
                  className="space-y-4"
                >
                  <h1 className="text-4xl font-bold text-black">Join Us</h1>
                  <p className="text-sm text-neutral-600">
                    Create your LEFAGO account
                  </p>

                  <FormField
                    control={registerForm.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Full Name"
                            className="h-12 rounded-2xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Email"
                            className="h-12 rounded-2xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            className="h-12 rounded-2xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm Password"
                            className="h-12 rounded-2xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="agree"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start gap-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div>
                          <FormLabel className="text-sm font-normal leading-5">
                            I agree to the Terms of Service
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button className="h-12 w-full rounded-full bg-[#6aa3d8] text-white hover:bg-[#5e96ca]">
                    Create Account
                  </Button>

                  <p className="text-center text-sm text-neutral-600">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsRegister(false)}
                      className="font-medium text-sky-600"
                    >
                      Sign in
                    </button>
                  </p>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}