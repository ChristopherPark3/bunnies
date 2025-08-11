"use client";

import { Bunny } from "@/lib/types";
import { DateRange } from "react-day-picker";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Check,
  Mars,
  Venus,
  X,
  Calendar,
  User,
  Mail,
  Phone,
} from "lucide-react";

interface ReviewProps {
  bunnies: Bunny[];
  dateRange: DateRange | undefined;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  onEditBunnies: () => void;
  onEditSchedule: () => void;
  onEditContact: () => void;
  onSubmit: () => void;
}

export const Review = ({
  bunnies,
  dateRange,
  firstName,
  lastName,
  email,
  phoneNumber,
  onEditBunnies,
  onEditSchedule,
  onEditContact,
  onSubmit,
}: ReviewProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTotalDays = () => {
    if (!dateRange?.from || !dateRange?.to) return 0;
    const diffTime = Math.abs(
      dateRange.to.getTime() - dateRange.from.getTime()
    );
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[800px] px-4">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Review Your Booking
        </h1>
        <p className="text-sm text-gray-500">
          Please review all the details before confirming your bunny boarding
          reservation.
        </p>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <User className="size-5" />
            Contact Information
          </h2>
          <Button variant="outline" size="sm" onClick={onEditContact}>
            Edit
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">First Name</p>
            <p className="font-medium">{firstName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Name</p>
            <p className="font-medium">{lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium flex items-center gap-2">
              <Mail className="size-4" />
              {email}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone Number</p>
            <p className="font-medium flex items-center gap-2">
              <Phone className="size-4" />
              {phoneNumber || "Not provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Bunnies Information */}
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Bunnies ({bunnies.length})
          </h2>
          <Button variant="outline" size="sm" onClick={onEditBunnies}>
            Edit
          </Button>
        </div>
        <div className="space-y-4">
          {bunnies.map((bunny, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
            >
              {bunny.picture ? (
                <img
                  src={bunny.picture}
                  alt={`${bunny.name}`}
                  className="size-20 object-cover rounded-lg"
                />
              ) : (
                <div className="size-20 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-xs">No photo</span>
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium text-lg">{bunny.name}</h3>
                  {bunny.isMale ? (
                    <Mars className="text-sky-400 size-4" />
                  ) : (
                    <Venus className="text-rose-400 size-4" />
                  )}
                </div>
                <div className="flex gap-2">
                  <Badge className="flex items-center gap-1 bg-gray-100 text-sm font-normal text-gray-600">
                    {bunny.isVaccinated ? (
                      <Check className="text-green-500 size-3" />
                    ) : (
                      <X className="text-red-500 size-3" />
                    )}
                    Vaccinated
                  </Badge>
                  <Badge className="flex items-center gap-1 bg-gray-100 text-sm font-normal text-gray-600">
                    {bunny.isSpayed ? (
                      <Check className="text-green-500 size-3" />
                    ) : (
                      <X className="text-red-500 size-3" />
                    )}
                    Spayed
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Information */}
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Calendar className="size-5" />
            Boarding Schedule
          </h2>
          <Button variant="outline" size="sm" onClick={onEditSchedule}>
            Edit
          </Button>
        </div>
        {dateRange?.from && dateRange?.to ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Check-in Date</p>
              <p className="font-medium">{formatDate(dateRange.from)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Check-out Date</p>
              <p className="font-medium">{formatDate(dateRange.to)}</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t">
              <p className="text-sm text-gray-500">Total Days</p>
              <p className="font-medium text-lg">{getTotalDays()} days</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No dates selected</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={onSubmit}
          className="w-full max-w-md bg-sage text-white hover:bg-sage/80 text-lg py-3"
          disabled={!dateRange?.from || !dateRange?.to || bunnies.length === 0}
        >
          Confirm Booking
        </Button>
      </div>

      {/* Validation Message */}
      {(!dateRange?.from || !dateRange?.to || bunnies.length === 0) && (
        <p className="text-sm text-red-500 text-center">
          Please complete all sections before confirming your booking.
        </p>
      )}
    </div>
  );
};
