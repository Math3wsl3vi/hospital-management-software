"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { userAuth } from "@/lib/data";
import { useRouter } from "next/navigation";
import React, {  useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface User {
  username: string;
  password: string;
  role: string;
}

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = () => {
    const foundUser = Object.values(userAuth).find(
      (u) => u.username === username && u.password === password
    ) as User | undefined;

    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      toast({ description: `Welcome ${foundUser.role}` });

      switch (foundUser.role) {
        case "doctor":
          router.push("/UserAccounts/Doctor");
          break;
        case "nurse":
          router.push("/UserAccounts/Nurse");
          break;
        case "pharmacy":
          router.push("/UserAccounts/Pharmacy");
          break;
        case "lab":
          router.push("/UserAccounts/Lab");
          break;
        case "admin":
          router.push("/UserAccounts/Admin");
          break;
        case "reception":
          router.push("/UserAccounts/Reception");
          break;
        default:
          break;
      }
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center flex-col p-4 bg-gradient-to-br from-green-50 to-white">
      <Card className="w-full max-w-md shadow-lg border border-green-100 rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-xl">
        <CardHeader className="bg-green-50 p-6 text-center">
            <Link href="/" className="flex items-center">
          <Image
            src="/images/logo3.png"
            alt="Riviamed Logo"
            width={120}
            height={120}
            className="transition-transform duration-300 hover:scale-105"
          />
          <h1 className="md:text-4xl font-semibold">R I V I A M E D</h1>
        </Link>
          <p className="text-sm text-green-600 mt-1">Welcome back</p>
          <p className="text-xs text-green-500">Authorized access required</p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <Label htmlFor="username" className="text-green-700">Email</Label>
            <Input
              id="username"
              type="text"
              placeholder="your@email.com"
              value={username}
              autoCapitalize="none"
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 border-green-200 focus:border-green-400"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-green-700">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 border-green-200 focus:border-green-400 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-green-500 hover:text-green-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </CardContent>
        <CardFooter className="p-6 flex flex-col gap-4">
          <Button
            className="w-full bg-green-1 text-white hover:bg-green-600 py-3 rounded-lg transition-colors duration-300"
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            variant="link"
            className="text-green-1 hover:text-green-700 text-sm"
            onClick={() => router.push("/forgot-password")}
          >
            Forgot password?
          </Button>
        </CardFooter>
      </Card>
      <p className="mt-6 text-sm text-green-600 text-center">
        By continuing, you agree to our Terms of Service and acknowledge our Privacy Policy.
      </p>
      <div className="absolute bottom-4 text-sm">
        Powered by MantleAfya® © {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default SignIn;