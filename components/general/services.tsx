"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";

export const Services = () => {
  const [price, setPrice] = useState(30);
  const [count, setCount] = useState(1);

  useEffect(() => {
    const calculatePrice = () => {
      if (count === 2) return 45;
      if (count === 3) return 55;

      return 30;
    };
    setPrice(calculatePrice());
  }, [count]);

  const incrementCount = () => {
    setCount((prev) => Math.min(prev + 1, 5)); // Max 5 bunnies
  };

  const decrementCount = () => {
    setCount((prev) => Math.max(prev - 1, 1)); // Min 1 bunny
  };

  const services = [
    {
      title: "Boarding",
      duration: "Single day or multiple days",
      price: "$30",
      description:
        "Care for your bunny while you're away. Includes fresh hay, water, and a safe, clean environment.",
      features: [
        "24/7 monitoring",
        "Safe, dedicated play time",
        "Emergency care available if needed",
        "Comfort items welcome",
        "Hay, greens, and water provided",
      ],
      note: "Must provide your own pellets",
    },
  ];

  return (
    <section id="services" className="py-20 bg-sage/20 w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-warm-brown mb-6">
            Services & Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Flexible boarding options designed around your bunny&apos;s needs
            and your schedule. All services include premium care in a safe,
            loving environment.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <Image
            src={`/billy-belinda-vienna.jpeg`}
            alt="Billy, Belinda, and Vienna"
            className="rounded-xl"
            width={500}
            height={500}
          />

          <div className="grid gap-6">
            <Card className="gap-2">
              <CardHeader>
                <CardTitle className="text-xl text-warm-brown">
                  What&apos;s provided for your bunny&apos;s stay
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-sage rounded-full mr-3" />
                    Greens (Cilantro, Parsley, Dandelion greens, Lettuce)
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-sage rounded-full mr-3" />
                    Unlimited hay
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-sage rounded-full mr-3" />
                    Alflafa for young rabbits
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-sage rounded-full mr-3" />
                    Treats (Selective Natural Treats)
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-sage rounded-full mr-3" />
                    Litter box (cleaned and sanitized after each use)
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-sage rounded-full mr-3" />
                    Bedding
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-sage rounded-full mr-3" />
                    Toys (Cleaned and sanitized after each use)
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-sage rounded-full mr-3" />
                    Kennel and play pen (4 x 4 ft)
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="gap-2 flex flex-col px-6">
              <div className="flex justify-between items-start">
                <CardTitle className="flex gap-4">
                  <p className="text-xl text-warm-brown">Boarding</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={decrementCount}
                        disabled={count <= 1}
                        className="w-8 h-8 p-0"
                      >
                        -
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {count}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={incrementCount}
                        disabled={count >= 3}
                        className="w-8 h-8 p-0"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </CardTitle>
                <div className="flex flex-col items-end">
                  <p className="text-3xl font-bold text-sage">${price}</p>
                  <p className="text-sm text-muted-foreground">per day</p>
                  {count > 1 && (
                    <p className="text-xs text-green-600 font-medium">
                      Discount applied
                    </p>
                  )}
                </div>
              </div>
              <CardContent className="px-0">
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-sage rounded-full mr-3" />
                    <p>24/7 monitoring</p>
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-sage rounded-full mr-3" />
                    <p>Safe, dedicated play time</p>
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-sage rounded-full mr-3" />
                    <p>Emergency care available if needed</p>
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-sage rounded-full mr-3" />
                    <p>Comfort items welcome</p>
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-sage rounded-full mr-3" />
                    <p>Hay, greens, and water provided</p>
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-sage rounded-full mr-3" />
                    <p>Must provide your own pellets</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="gap-2">
              <CardHeader>
                <CardTitle className="text-xl text-warm-brown">
                  Additional Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-sage rounded-full mr-3" />
                    Medication administration (if needed) - $5/day
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-sage rounded-full mr-3" />
                    Sanitary shaving/deshedding - $20
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-sage rounded-full mr-3" />
                    Nail trims - $10
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
