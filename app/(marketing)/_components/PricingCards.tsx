"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { pricingPlans } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import React, { useState } from 'react'

export const PricingCards = () => {
    const [isAnnual, setIsAnnual] = useState(false);
  return (
    <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-2">
          Choose the Circle plan that&apos;s right for you.
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          No credit card required. You can cancel at any time.
        </p>

        <div className="flex justify-center items-center space-x-4 mb-12">
          <span className={`text-sm ${!isAnnual ? "font-semibold" : ""}`}>
            Monthly
          </span>
          <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
          <span className={`text-sm ${isAnnual ? "font-semibold" : ""}`}>
            Annually
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`flex flex-col ${
                plan.popular ? "border-primary" : ""
              } ${plan.bestForBrands ? "border-secondary" : ""}`}
            >
              <CardHeader>
                {plan.popular && (
                  <div className="text-lg text-primary mb-2 text-blue-500 font-bold text-center border-b-2 border-blue-500">
                    MOST POPULAR
                  </div>
                )}
                {plan.bestForBrands && (
                  <div className="text-xs font-semibold text-secondary mb-2">
                    BEST FOR BRANDS
                  </div>
                )}
                <CardTitle
                  className={cn(
                    "text-2xl font-bold",
                    plan.popular ? "text-blue-500" : ""
                  )}
                >
                  {plan.name}
                </CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold">${plan.price}</span>
                  {isAnnual ? "/year" : "/month"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-4">
                  {plan.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.additionalFeatures && (
                  <>
                    <h4 className="font-semibold mb-2">Plus:</h4>
                    <ul className="space-y-2">
                      {plan.additionalFeatures.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {isAnnual && plan.annualOnly && (
                  <>
                    <h4 className="font-semibold mt-4 mb-2">
                      Annual plan only:
                    </h4>
                    <ul className="space-y-2">
                      {plan.annualOnly.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button
                  className="w-full"
                  variant={
                    plan.popular || plan.bestForBrands ? "secondary" : "super"
                  }
                >
                  Free 14-day trial
                </Button>
                {(plan.name === "Business" || plan.name === "Enterprise") && (
                  <Button variant="primaryOutline" className="text-sm">
                    Talk to sales
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
  )
}
