"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { User, Mail, Phone } from "lucide-react";

interface ContactInformationProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
}

export const ContactInformation = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  setFirstName,
  setLastName,
  setEmail,
  setPhoneNumber,
}: ContactInformationProps) => {
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Form is valid, you can proceed to next step
      console.log("Contact information submitted:", {
        firstName,
        lastName,
        email,
        phoneNumber,
      });
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-md items-center gap-8">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Contact Information
        </h1>
        <p className="text-sm text-gray-500">
          Please provide your contact details for the booking.
        </p>
      </div>

      <div className="flex flex-col gap-6 w-full">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName" className="flex items-center gap-2">
            <User className="size-4" />
            First Name *
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName" className="flex items-center gap-2">
            <User className="size-4" />
            Last Name *
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            value={firstName}
            onChange={(e) => setLastName(e.target.value)}
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="size-4" />
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="flex items-center gap-2">
            <Phone className="size-4" />
            Phone Number (Optional)
          </Label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <p className="text-xs text-gray-500">
            We&apos;ll only use this to contact you about your booking or in the
            event of an emergency.
          </p>
        </div>
      </div>
    </div>
  );
};
