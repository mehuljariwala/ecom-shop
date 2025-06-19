"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slices/authSlice";
import { showToast } from "../../store/slices/uiSlice";
import { Button } from "../ui/button";
import Link from "next/link";

interface LoginFormProps {
  onLoginSuccess: () => void;
  onContinueAsGuest: () => void;
}

const LoginForm = ({ onLoginSuccess, onContinueAsGuest }: LoginFormProps) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would make an API call to authenticate
      // For demo purposes, we'll simulate a successful login after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful login
      dispatch(
        setCredentials({
          user: {
            id: "user-1",
            email: formData.email,
            name: "John Doe",
            role: "user",
          },
          token: "mock-jwt-token",
        })
      );

      dispatch(
        showToast({
          message: "Login successful",
          type: "success",
        })
      );

      onLoginSuccess();
    } catch {
      // Error is caught but not used
      dispatch(
        showToast({
          message: "Login failed. Please try again.",
          type: "error",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Login Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Returning Customer</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="text-primary-600 hover:text-primary-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>

        {/* Guest Checkout */}
        <div className="border-t pt-6 md:border-t-0 md:border-l md:pl-10 md:pt-0">
          <h2 className="text-xl font-semibold mb-4">New Customer</h2>
          <p className="text-gray-600 mb-6">
            Create an account for faster checkout, order tracking, and
            personalized shopping experiences.
          </p>

          <div className="space-y-4">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onContinueAsGuest}
            >
              Continue as Guest
            </Button>

            <Link href="/register">
              <Button type="button" variant="secondary" className="w-full">
                Create Account
              </Button>
            </Link>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-600">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="text-primary-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-primary-600 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
