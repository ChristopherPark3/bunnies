"use client";

import { Bunny, KennelConfiguration } from "@/lib/types";
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
  Percent,
} from "lucide-react";

interface AdditionalServices {
  sanitaryShaving: boolean;
  nailTrim: boolean;
  medication: boolean;
}

interface ReviewProps {
  bunnies: Bunny[];
  kennels: KennelConfiguration[];
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
  kennels,
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

  const isWeekOrLonger = () => {
    return getTotalDays() >= 7;
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
    
    // Calculate price per kennel based on bunny count
    const getKennelPrice = (bunnyCount: number) => {
      if (bunnyCount === 1) return 30;
      if (bunnyCount === 2) return 45;
      if (bunnyCount === 3) return 55;
      return 0;
    };
    
    const dailyCost = kennels.reduce((total, kennel) => {
      return total + getKennelPrice(kennel.bunnies.length);
    }, 0);
    
    return dailyCost * days;
  };

  const calculateDiscountAmount = () => {
    if (!isWeekOrLonger()) return 0;
    const dailyCost = kennels.reduce((total, kennel) => {
      const getKennelPrice = (bunnyCount: number) => {
        if (bunnyCount === 1) return 30;
        if (bunnyCount === 2) return 45;
        if (bunnyCount === 3) return 55;
        return 0;
      };
      return total + getKennelPrice(kennel.bunnies.length);
    }, 0);
    
    const baseCost = dailyCost * getTotalDays();
    return Math.round(baseCost * 0.15); // 15% discount on base boarding cost only
  };

  const calculateTotalCost = () => {
    const baseCost = calculateBaseCost();
    const additionalServicesCost = calculateAdditionalServicesCost();
    const discountAmount = calculateDiscountAmount();
    return baseCost + additionalServicesCost - discountAmount;
  };
  
  const getDailyCost = () => {
    const getKennelPrice = (bunnyCount: number) => {
      if (bunnyCount === 1) return 30;
      if (bunnyCount === 2) return 45;
      if (bunnyCount === 3) return 55;
      return 0;
    };
    
    return kennels.reduce((total, kennel) => {
      return total + getKennelPrice(kennel.bunnies.length);
    }, 0);
  };

  return (
    <div className="flex flex-col gap-8 w-full px-[10%] lg:px-[20%] pb-4 overflow-y-auto">
      {/* Review Details */}
      <div className="w-full">
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
              Bunnies ({bunnies.length}) in {kennels.length} kennel{kennels.length !== 1 ? "s" : ""}
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
              {isWeekOrLonger() && (
                <div className="flex items-center justify-center pt-2">
                  <Badge className="flex items-center gap-1 bg-green-100 text-green-700 text-sm font-medium">
                    <Percent className="size-3" />
                    Weekly Discount Applied (15% off boarding)
                  </Badge>
                </div>
              )}
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

      {/* Total Cost Card */}
      <div className="w-full">
        <div className="bg-gradient-to-br from-sage/10 to-sage/5 border-2 border-sage/30 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-warm-brown">
              Booking Summary
            </h2>
            <div className="text-right">
              <p className="text-sm text-gray-600 uppercase tracking-wide font-medium">
                Total Cost
              </p>
              <p className="text-3xl font-bold text-sage mt-1">
                ${calculateTotalCost()}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Boarding Details */}
            <div className="bg-white/70 rounded-lg p-4 border border-sage/20">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                Boarding Charges
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    {getDailyCost()}/day × {getTotalDays()} days
                  </span>
                  <span className="font-semibold text-gray-900">
                    ${calculateBaseCost()}
                  </span>
                </div>
                {isWeekOrLonger() && (
                  <div className="flex items-center justify-between text-sm text-green-700 pt-1 border-t border-sage/20">
                    <span className="flex items-center gap-1">
                      <Percent className="size-3" />
                      Weekly discount (15% off)
                    </span>
                    <span className="font-semibold">-${calculateDiscountAmount()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Services */}
            {hasAdditionalServices() && (
              <div className="bg-white/70 rounded-lg p-4 border border-sage/20">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                  Additional Services
                </p>
                <div className="space-y-2">
                  {additionalServices.sanitaryShaving && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Sanitary shaving/deshedding</span>
                      <span className="font-semibold text-gray-900">$20</span>
                    </div>
                  )}
                  {additionalServices.nailTrim && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">Nail trim</span>
                      <span className="font-semibold text-gray-900">$10</span>
                    </div>
                  )}
                  {additionalServices.medication && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">
                        Medication administration ({getTotalDays()} days)
                      </span>
                      <span className="font-semibold text-gray-900">${getTotalDays() * 5}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-sage/20 mt-2">
                    <span className="text-sm font-semibold text-gray-800">
                      Additional Services Subtotal
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      ${calculateAdditionalServicesCost()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
