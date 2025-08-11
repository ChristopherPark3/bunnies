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
  Scissors,
  Pill,
} from "lucide-react";

interface AdditionalServices {
  sanitaryShaving: boolean;
  nailTrim: boolean;
  medication: boolean;
}

interface ReviewProps {
  bunnies: Bunny[];
  dateRange: DateRange | undefined;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  additionalServices: AdditionalServices;
  onEditBunnies: () => void;
  onEditSchedule: () => void;
  onEditContact: () => void;
  onEditAdditionalServices: () => void;
  onSubmit: () => void;
}

export const Review = ({
  bunnies,
  dateRange,
  firstName,
  lastName,
  email,
  phoneNumber,
  additionalServices,
  onEditBunnies,
  onEditSchedule,
  onEditContact,
  onEditAdditionalServices,
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

  const calculateAdditionalServicesCost = () => {
    let total = 0;
    if (additionalServices.sanitaryShaving) total += 20;
    if (additionalServices.nailTrim) total += 10;
    if (additionalServices.medication) {
      const days = getTotalDays();
      total += days * 5;
    }
    return total;
  };

  const hasAdditionalServices = () => {
    return (
      additionalServices.sanitaryShaving ||
      additionalServices.nailTrim ||
      additionalServices.medication
    );
  };

  const calculateBaseCost = () => {
    const days = getTotalDays();
    return days * 25; // Assuming $25 per day per bunny
  };

  const calculateTotalCost = () => {
    const baseCost = calculateBaseCost() * bunnies.length;
    const additionalServicesCost = calculateAdditionalServicesCost();
    return baseCost + additionalServicesCost;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-[1200px] px-4">
      {/* Review Details */}
      <div className="flex-1">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Review Your Booking
          </h1>
          <p className="text-sm text-gray-500">
            Please review all the details before confirming your bunny boarding
            reservation.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg border p-6 shadow-sm mb-6">
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
        <div className="bg-white rounded-lg border p-6 shadow-sm mb-6">
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
        <div className="bg-white rounded-lg border p-6 shadow-sm mb-6">
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

        {/* Additional Services */}
        <div className="bg-white rounded-lg border p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Scissors className="size-5" />
              Additional Services
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={onEditAdditionalServices}
            >
              Edit
            </Button>
          </div>
          {hasAdditionalServices() ? (
            <div className="space-y-3">
              {additionalServices.sanitaryShaving && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Scissors className="size-4 text-sage" />
                    <span className="text-sm">Sanitary shaving/deshedding</span>
                  </div>
                  <span className="font-medium text-sage">$20</span>
                </div>
              )}
              {additionalServices.nailTrim && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Scissors className="size-4 text-sage" />
                    <span className="text-sm">Nail trim</span>
                  </div>
                  <span className="font-medium text-sage">$10</span>
                </div>
              )}
              {additionalServices.medication && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Pill className="size-4 text-sage" />
                    <span className="text-sm">
                      Medication administration ({getTotalDays()} days)
                    </span>
                  </div>
                  <span className="font-medium text-sage">
                    ${getTotalDays() * 5}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between pt-3 border-t">
                <span className="font-medium text-gray-700">
                  Additional Services Total
                </span>
                <span className="font-bold text-lg text-sage">
                  ${calculateAdditionalServicesCost()}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No additional services selected</p>
          )}
        </div>
      </div>

      {/* Total Cost Card - Bottom on small screens, Left on large screens */}
      <div className="lg:hidden">
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Total Cost
          </h2>

          <div className="space-y-3">
            {/* Base Boarding Cost */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Boarding ({bunnies.length} bunny
                {bunnies.length !== 1 ? "ies" : ""} × {getTotalDays()} days)
              </span>
              <span className="font-medium">
                ${calculateBaseCost() * bunnies.length}
              </span>
            </div>

            {/* Additional Services Breakdown */}
            {hasAdditionalServices() && (
              <>
                {additionalServices.sanitaryShaving && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Sanitary shaving</span>
                    <span className="font-medium">$20</span>
                  </div>
                )}
                {additionalServices.nailTrim && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Nail trim</span>
                    <span className="font-medium">$10</span>
                  </div>
                )}
                {additionalServices.medication && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Medication ({getTotalDays()} days)
                    </span>
                    <span className="font-medium">${getTotalDays() * 5}</span>
                  </div>
                )}
              </>
            )}

            {/* Total */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <span className="font-semibold text-lg text-gray-800">Total</span>
              <span className="font-bold text-2xl text-sage">
                ${calculateTotalCost()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Total Cost Card - Left Side on large screens */}
      <div className="hidden lg:block lg:w-80 lg:flex-shrink-0">
        <div className="bg-white rounded-lg border p-6 shadow-sm sticky top-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Total Cost
          </h2>

          <div className="space-y-3">
            {/* Base Boarding Cost */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Boarding ({bunnies.length} bunny
                {bunnies.length !== 1 ? "ies" : ""} × {getTotalDays()} days)
              </span>
              <span className="font-medium">
                ${calculateBaseCost() * bunnies.length}
              </span>
            </div>

            {/* Additional Services Breakdown */}
            {hasAdditionalServices() && (
              <>
                {additionalServices.sanitaryShaving && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Sanitary shaving</span>
                    <span className="font-medium">$20</span>
                  </div>
                )}
                {additionalServices.nailTrim && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Nail trim</span>
                    <span className="font-medium">$10</span>
                  </div>
                )}
                {additionalServices.medication && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Medication ({getTotalDays()} days)
                    </span>
                    <span className="font-medium">${getTotalDays() * 5}</span>
                  </div>
                )}
              </>
            )}

            {/* Total */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <span className="font-semibold text-lg text-gray-800">Total</span>
              <span className="font-bold text-2xl text-sage">
                ${calculateTotalCost()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
