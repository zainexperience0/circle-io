import { Card, CardContent } from "@/components/ui/card";
import { features_0 } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import React from "react";

export const MainFeatures = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">
        All the features you need to get started in minutes
      </h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        You have a vision for your community experience. Circle provides you
        with the building blocks to bring your vision to life — fast and without
        the headaches.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features_0.map((feature, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center gap-x-2">
                <div
                  className={cn(
                    "h-5 w-5 rounded-full",
                    feature.title === "Start" && "bg-pink-500",
                    feature.title === "Engage" && "bg-yellow-500",
                    feature.title === "Monetize" && "bg-emerald-500",
                    feature.title === "Scale" && "bg-purple-500"
                  )}
                />
                <h2 className="text-xl font-semibold">{feature.title}</h2>
              </div>
              <ul className="space-y-2 mt-3">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center">
                    <Check
                      className={`w-4 p-[2px] h-4 mr-2 rounded-full border bg-gray-300 text-blue-600`}
                    />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
