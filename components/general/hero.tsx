"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import bunnies from "@/public/our-buns/billy-belinda-vienna.jpeg";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const router = useRouter();

  return (
    <section className="relative pt-40 pb-40 flex items-center justify-center overflow-hidden w-full bg-sage/20">
      <div className="absolute inset-0 " />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-warm-brown mb-6 leading-tight">
              Safe & Loving
              <span className="block text-sage">Bunny Boarding</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Your beloved bunny deserves the best care while you&apos;re away.
              Professional, experienced, and passionate about rabbit care.
            </p>
            <div className="flex flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => {
                  router.push("/booking");
                }}
                className="text-lg px-8 bg-sage/80 hover:bg-sage/90 cursor-pointer"
              >
                Book Now
              </Button>
              <Button
                size="lg"
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-lg px-8 bg-secondary hover:bg-secondary/80 cursor-pointer text-secondary-foreground"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={bunnies}
                alt="Adorable bunny in natural setting"
                className="w-full h-auto object-cover"
                width={500}
                height={500}
              />
              <div className="absolute inset-0 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
