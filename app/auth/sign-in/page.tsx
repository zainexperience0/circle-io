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
import ShineBorder from "@/components/ui/shine-border";

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
    <ShineBorder>
      hy
    </ShineBorder>
  );
}
