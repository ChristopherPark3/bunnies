"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Clock, Mail, Heart } from "lucide-react";

export const Maintenance = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage/10 via-background to-sage/5 flex items-center justify-center p-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-6 w-24 h-24 bg-sage/20 rounded-full flex items-center justify-center">
              <Heart className="w-12 h-12 text-sage" />
            </div>
            <CardTitle className="text-4xl lg:text-5xl font-bold text-warm-brown mb-4">
              We&apos;re Taking Care of Our Bunnies
            </CardTitle>
            <CardDescription className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Kim&apos;s Bunny Boarding is currently undergoing some
              improvements to provide even better care for your beloved pets.
              We&apos;ll be back soon!
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Status Section */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-sage/10 text-sage px-4 py-2 rounded-full text-sm font-medium">
                <Clock className="w-4 h-4" />
                Scheduled Maintenance
              </div>
              <p className="text-muted-foreground mt-4 text-lg">
                We&apos;re enhancing our facilities and systems to give your
                bunnies the best possible experience.
              </p>
            </div>

            {/* What We're Doing */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-warm-brown flex items-center gap-2">
                  <Heart className="w-5 h-5 text-sage" />
                  What We&apos;re Improving
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-sage rounded-full mt-2 flex-shrink-0"></span>
                    Upgrading our booking system for easier reservations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-sage rounded-full mt-2 flex-shrink-0"></span>
                    Enhancing our bunny play areas and enclosures
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-sage rounded-full mt-2 flex-shrink-0"></span>
                    Improving our customer communication system
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-sage rounded-full mt-2 flex-shrink-0"></span>
                    Adding new safety features and monitoring
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-warm-brown flex items-center gap-2">
                  <Clock className="w-5 h-5 text-sage" />
                  Expected Timeline
                </h3>
                <div className="bg-sage/10 p-4 rounded-lg">
                  <p className="text-muted-foreground">
                    We expect to be back online within the next few hours. Thank
                    you for your patience as we make these important
                    improvements.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-t pt-8">
              <h3 className="text-xl font-semibold text-warm-brown text-center mb-6">
                Need to reach us urgently?
              </h3>
              <div className="">
                <div className="text-center p-4 bg-sage/5 rounded-lg">
                  <Mail className="w-6 h-6 text-sage mx-auto mb-2" />
                  <p className="font-medium text-warm-brown">Email Us</p>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll respond within 24 hours
                  </p>
                </div>
              </div>
            </div>

            {/* Bunny Image */}
            <div className="text-center pt-6">
              <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/our-buns/billy-belinda-vienna.jpeg"
                  alt="Happy bunnies at Kim's Bunny Boarding"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-muted-foreground mt-4 italic">
                Our bunnies are still being cared for with love during this time
                ❤️
              </p>
            </div>

            {/* Refresh Button */}
            <div className="text-center pt-4">
              <Button
                onClick={() => window.location.reload()}
                className="bg-sage hover:bg-sage/90 text-white px-8"
              >
                Check Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
