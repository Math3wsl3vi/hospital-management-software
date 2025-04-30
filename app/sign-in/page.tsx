"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { userAuth } from "@/lib/data";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface User {
  username: string;
  password: string;
  role: string;
}

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null); // ✅ Fix applied
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleLogin = () => {
    const foundUser = Object.values(userAuth).find(
      (u) => u.username === username && u.password === password
    ) as User | undefined; // ✅ Type assertion fix

    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      setUser(foundUser); // ✅ Fix applied
      console.log(user)

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
      toast({ description: `Welcome ${foundUser.role}` });
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
    <div className="flex items-center justify-center mt-[20vh]">
      <div className="border w-full md:w-1/3 p-5 rounded-md">
        <h1 className="text-center font-semibold text-lg">Welcome to HMS</h1>
        <h1 className="text-center text-green-1 uppercase">Login to continue</h1>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <label htmlFor="username">Username</label>
            <Input
              id="username"
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
              value={username}
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              type="password"
              className="focus-visible:ring-0 focus-visible:ring-offset-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col items-center justify-center mt-5">
            <Button className="w-1/2 bg-green-1" onClick={handleLogin}>
              Continue
            </Button>
            {error && <p className="text-sm mt-3">{error}</p>}
          </div>
          <Button
            onClick={handleLogout}
            className="bg-white text-red-500 shadow-none hover:bg-white"
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
