"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { userAuth } from "@/lib/data";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface User {
  username: string;
  password: string;
  role: string;
}

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = () => {
    const foundUser = Object.values(userAuth).find(
      (u) => u.username === username && u.password === password
    ) as User | undefined;

    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      setUser(foundUser);
      console.log(user)

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast({ description: "User Logged Out Successfully" });

    setTimeout(() => {
      router.replace("/sign-in");
    }, 500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center flex-col">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Welcome to NOVAMED</CardTitle>
          <p className="text-sm text-center text-muted-foreground">Use your credentials to login</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              autoCorrect="none"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full bg-green-1" onClick={handleLogin}>
            Continue
          </Button>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-red-500 hover:bg-transparent"
          >
            Log out
          </Button>
        </CardFooter>
      </Card>

      <div className="absolute bottom-5">
        <h1>Powered by MantleAfya®</h1>
      </div>
    </div>
  );
};

export default SignIn;
