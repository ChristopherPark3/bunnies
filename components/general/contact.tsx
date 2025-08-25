"use client";

import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const Contact = () => {
  const router = useRouter();
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-warm-brown mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to book your bunny&apos;s stay? Have questions about my
              services? I&apos;d love to hear from you and discuss your
              bunny&apos;s needs.
            </p>
          </div>

          <div className="flex justify-center mb-16">
            <Button
              className="bg-sage text-white hover:bg-sage/80 hover:cursor-pointer hover:text-white w-60 h-16 rounded-xl text-2xl"
              onClick={() => {
                router.push("/booking");
              }}
            >
              Book now!
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-sage" />
              </div>
              <div>
                <h3 className="font-semibold text-warm-brown text-lg">Email</h3>
                <p className="text-muted-foreground">
                  kimsbunnyboarding@gmail.com
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-sage" />
              </div>
              <div>
                <h3 className="font-semibold text-warm-brown text-lg">
                  Location
                </h3>
                <p className="text-muted-foreground">
                  Located in South San Francisco. Drop off/Pick up: either in
                  South San Francisco (M-F after 3pm; weekends any time) or San
                  Mateo (only M-F 7am - 3pm)
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto p-6 bg-sage/5 rounded-lg border border-sage/10 text-center">
            <h4 className="font-semibold text-sage mb-3 text-lg">
              Response Time
            </h4>
            <p className="text-muted-foreground">
              I typically respond to all inquiries within 24 hours. For urgent
              matters, please call directly for the fastest response.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
