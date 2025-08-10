"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/app/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export const Contact = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bunnyName: "",
    dates: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/booking");
    toast({
      title: "Message Sent!",
      description:
        "Thank you for your inquiry. I'll get back to you within 24 hours.",
    });
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bunnyName: "",
      dates: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-warm-brown mb-6">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground">
              Ready to book your bunny&apos;s stay? Have questions about my
              services? I&apos;d love to hear from you and discuss your
              bunny&apos;s needs.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Card className="h-full border-0 shadow-card bg-gradient-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-warm-brown">
                    Contact Information
                  </CardTitle>
                  <CardDescription>
                    Reach out through any of these methods. I&apos;m here to
                    help!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-sage/10 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-sage" />
                    </div>
                    <div>
                      <p className="font-medium text-warm-brown">Email</p>
                      <p className="text-muted-foreground">
                        kimsbunnyboarding@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-sage/10 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-sage" />
                    </div>
                    <div>
                      <p className="font-medium text-warm-brown">Phone</p>
                      <p className="text-muted-foreground">(555) 123-BUNNY</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-sage/10 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-sage" />
                    </div>
                    <div>
                      <p className="font-medium text-warm-brown">Location</p>
                      <p className="text-muted-foreground">
                        Downtown area, specific address shared upon booking
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-sage/10 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-sage" />
                    </div>
                    <div>
                      <p className="font-medium text-warm-brown">
                        Availability
                      </p>
                      <p className="text-muted-foreground">
                        7 days a week, 7:00 AM - 8:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-sage/5 rounded-lg border border-sage/10">
                    <h4 className="font-semibold text-sage mb-2">
                      Response Time
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      I typically respond to all inquiries within 24 hours. For
                      urgent matters, please call directly for the fastest
                      response.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="border-0 shadow-card bg-gradient-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-warm-brown">
                    Book Your Bunny&apos;s Stay
                  </CardTitle>
                  <CardDescription>
                    Fill out this form and I&apos;ll get back to you with
                    availability and next steps.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-warm-brown">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-warm-brown">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-warm-brown">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-warm-brown">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full text-lg py-6 group flex items-center justify-center gap-2"
                    >
                      <p>Continue </p>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
