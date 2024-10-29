"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { CheckCircle, Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const CommunityCreate = () => {
  const [state, setState] = useState({
    fields: {
      name: "",
      url: "",
    },
    loading: false,
    error: false,
    success: false,
  });

  const router = useRouter();

  // Function to sanitize and generate URL based on community name
  const generateURL = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-") // Replace spaces and special characters with hyphens
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
  };

  // Automatically update URL when the name field changes
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      fields: {
        ...prevState.fields,
        url: generateURL(prevState.fields.name),
      },
    }));
  }, [state.fields.name]);

  const onSubmit = async () => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
      error: false, // Reset error before submission
    }));

    try {
      const res = await axios.post("/api/community", {
        name: state.fields.name,
        url: state.fields.url,
      });

      setState((prevState) => ({
        ...prevState,
        loading: false,
        success: true,
      }));

      setTimeout(() => {
        router.push(`/`);
      }, 2000);
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: true,
      }));
      console.log(error);
    }
  };

  const handleFieldChange = (e: any) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      fields: {
        ...prevState.fields,
        [name]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-purple-400 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="logo"
            className="bg-purple-700 rounded-md mx-auto"
          />
          <CardTitle className="text-2xl text-center">
            Now let&apos;s create your community
          </CardTitle>
          <CardDescription className="text-center">
            Don&apos;t worry — you can always change this information later
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="community-name">Name your community</Label>
            <Input
              name="name"
              value={state.fields.name}
              onChange={handleFieldChange}
              placeholder="zainexperience's Community"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="community-url">Community URL</Label>
            <div className="flex">
              <Input
                name="url"
                value={state.fields.url}
                onChange={handleFieldChange}
                placeholder="zainexperiences-community"
                className="rounded-r-none"
              />
              <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                circle.so
              </span>
            </div>
          </div>
          <Button
            onClick={onSubmit}
            disabled={state.loading || state.success}
            className="w-full"
            variant={"sidebarOutline"}
          >
            {state.loading && <Loader className="h-4 w-4 mr-2 animate-spin" />}
            {state.loading && "Creating..."}
            {!state.loading && !state.success && !state.error && "Submit"}
            {state.success && <CheckCircle className="h-4 w-4 mr-2" />}
            {state.success && `Community created!`}
            {state.error && "Failed to create!"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityCreate;
