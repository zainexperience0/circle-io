"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Loader } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSucess] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google").then(() => {
        setIsLoading(false);
        setSucess(true);
        setTimeout(() => {
          router.push("/community/create");
        }, 2000);
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-900 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="logo"
              width={40}
              height={40}
              className="bg-black rounded"
            />
            <p className="text-2xl font-bold">Arloo.dev</p>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleSignIn}
              variant="secondary"
              className="w-full h-12 text-lg transition-all duration-200 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
              ) : (
                <>
                  <FaGoogle className="w-5 h-5 mr-2" />
                  Sign In with Google
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      <p className="text-center text-sm text-white mt-6">Powered by Arloodots</p>
      </div>
    </div>

  );
}
