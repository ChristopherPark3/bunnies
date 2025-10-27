"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useEffect } from "react";

const IMAGE_URL =
  "https://kxxewjaybzjpalexpvew.supabase.co/storage/v1/object/sign/assets/site/ruffles.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81NGRjYWQ5Mi1lMjhiLTQ0MDAtYjlhMi00MjVlOTNjYWU1YzEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJhc3NldHMvc2l0ZS9ydWZmbGVzLmpwZWciLCJpYXQiOjE3NTYwODkwMzUsImV4cCI6NDg3ODE1MzAzNX0.ARTrqLa7kNH2hAei_ZTBkqX9w534diwXcLyE2-7apUw";

interface KennelConfiguration {
  id: number;
  bunnyCount: number;
}

export const Services = () => {
  const [totalBunnies, setTotalBunnies] = useState(1);
  const [kennels, setKennels] = useState<KennelConfiguration[]>([
    { id: 1, bunnyCount: 1 },
  ]);
  const [totalPrice, setTotalPrice] = useState(30);

  // Update total bunnies when kennel configurations change
  useEffect(() => {
    const total = kennels.reduce((sum, kennel) => sum + kennel.bunnyCount, 0);
    setTotalBunnies(total);
  }, [kennels]);

  // Calculate total price based on kennel configurations
  useEffect(() => {
    const calculatePrice = () => {
      let total = 0;
      kennels.forEach((kennel) => {
        if (kennel.bunnyCount === 1) {
          total += 30;
        } else if (kennel.bunnyCount === 2) {
          total += 45;
        } else if (kennel.bunnyCount === 3) {
          total += 55;
        }
      });
      return total;
    };
    setTotalPrice(calculatePrice());
  }, [kennels]);

  const adjustKennelBunnies = (kennelId: number, delta: number) => {
    setKennels((prev) =>
      prev.map((kennel) => {
        if (kennel.id === kennelId) {
          const newCount = Math.max(1, Math.min(3, kennel.bunnyCount + delta));
          // Check if adding would exceed max total of 5 bunnies across all kennels
          const currentTotal = prev.reduce(
            (sum, k) => sum + k.bunnyCount,
            0
          );
          if (currentTotal - kennel.bunnyCount + newCount > 5) {
            return kennel; // Don't allow adding if it would exceed max
          }
          return { ...kennel, bunnyCount: newCount };
        }
        return kennel;
      })
    );
  };

  const addKennel = () => {
    const currentTotal = kennels.reduce(
      (sum, kennel) => sum + kennel.bunnyCount,
      0
    );
    // Don't allow adding a new kennel if total bunnies would exceed 5
    if (currentTotal >= 5) return;

    const newKennel: KennelConfiguration = {
      id: Math.max(...kennels.map((k) => k.id)) + 1,
      bunnyCount: 1,
    };
    setKennels([...kennels, newKennel]);
  };

  const removeKennel = (kennelId: number) => {
    if (kennels.length <= 1) return; // Keep at least one kennel
    setKennels(kennels.filter((k) => k.id !== kennelId));
  };

  const getKennelPrice = (bunnyCount: number) => {
    if (bunnyCount === 1) return 30;
    if (bunnyCount === 2) return 45;
    if (bunnyCount === 3) return 55;
    return 0;
  };

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

          {/* Add pricing explanation card */}
          <div className="max-w-4xl mx-auto my-8">
            <Card className="bg-sage/10 border-sage/30">
              <CardHeader>
                <CardTitle className="text-xl text-warm-brown text-center">
                  How Our Pricing Works
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-base text-gray-700 mb-4">
                  We charge based on the number of kennels your bunnies will
                  occupy and how many bunnies are in each kennel.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm mb-4">
                  <div className="bg-white/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-warm-brown mb-2">
                      1 Bunny = $30/day
                    </h4>
                    <p className="text-gray-600">
                      One bunny per kennel
                    </p>
                  </div>
                  <div className="bg-white/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-warm-brown mb-2">
                      2 Bonded Bunnies = $45/day
                    </h4>
                    <p className="text-gray-600">
                      Two bunnies sharing one kennel
                    </p>
                  </div>
                  <div className="bg-white/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-warm-brown mb-2">
                      3 Bonded Bunnies = $55/day
                    </h4>
                    <p className="text-gray-600">
                      Three bunnies sharing one kennel
                    </p>
                  </div>
                </div>
                <p className="text-black font-bold mt-3 mx-auto">
                  <strong>Important:</strong> Maximum 3 bunnies per kennel. 
                  If your bunnies need separate kennels, you&apos;ll be charged 
                  per kennel. We currently have 3 kennels available. 
                  Pre-booking for holidays is recommended.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden">
            <img
              src={IMAGE_URL}
              alt="Ruffles"
              className="object-cover rounded-xl"
            />
          </div>

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
              <div className="flex justify-between items-start mb-4">
                <CardTitle>
                  <p className="text-xl text-warm-brown">Boarding Configuration</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Max 5 bunnies, max 3 per kennel
                  </p>
                </CardTitle>
                <div className="flex flex-col items-end">
                  <p className="text-3xl font-bold text-sage">${totalPrice}</p>
                  <p className="text-sm text-muted-foreground">per day</p>
                </div>
              </div>

              {/* Kennel configurations */}
              <div className="space-y-4">
                {kennels.map((kennel, index) => (
                  <div
                    key={kennel.id}
                    className="border rounded-lg p-4 bg-sage/5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-warm-brown">
                          Kennel {index + 1}
                        </span>
                        {kennels.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeKennel(kennel.id)}
                            className="h-6 px-2 text-destructive hover:text-destructive"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                      <p className="text-sm font-medium text-sage">
                        ${getKennelPrice(kennel.bunnyCount)}/day
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        Bunnies in this kennel:
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => adjustKennelBunnies(kennel.id, -1)}
                          disabled={kennel.bunnyCount <= 1}
                          className="w-8 h-8 p-0"
                        >
                          -
                        </Button>
                        <span className="w-12 text-center font-medium">
                          {kennel.bunnyCount}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => adjustKennelBunnies(kennel.id, 1)}
                          disabled={kennel.bunnyCount >= 3}
                          className="w-8 h-8 p-0"
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add kennel button */}
                <Button
                  variant="outline"
                  onClick={addKennel}
                  disabled={
                    kennels.reduce(
                      (sum, kennel) => sum + kennel.bunnyCount,
                      0
                    ) >= 5 || kennels.length >= 5
                  }
                  className="w-full border-dashed"
                >
                  + Add Another Kennel
                </Button>
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-muted-foreground">Total bunnies:</span>
                  <span className="font-medium">{totalBunnies}</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-muted-foreground">
                    Number of kennels:
                  </span>
                  <span className="font-medium">{kennels.length}</span>
                </div>
              </div>

              <CardContent className="px-0 pt-4 border-t mt-4">
                <p className="text-sm font-semibold text-warm-brown mb-2">
                  Includes:
                </p>
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
