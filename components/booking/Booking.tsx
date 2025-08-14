"use client";

/**
 * Bunny information
 *   - Name
 *   - Is vaccinated check
 *   - Is spayed/neutred check
 *   - M/F check
 *   - Optional picture upload
 *
 */

import { useEffect, useState } from "react";
import { Bunnies } from "./Bunnies";
import { Schedule } from "./Schedule";
import { Button } from "../ui/button";
import { Bunny } from "@/lib/types";
import { Review } from "./Review";
import { DateRange } from "react-day-picker";
import { ContactInformation } from "./ContactInformation";
import { AdditionalServices } from "./AdditionalServices";
import { useRouter } from "next/navigation";
import { test } from "@/utils/test";

export const Booking = () => {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [bunnies, setBunnies] = useState<Bunny[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [additionalServices, setAdditionalServices] = useState({
    sanitaryShaving: false,
    nailTrim: false,
    medication: false,
  });

  useEffect(() => {
    (async () => {
      await test();
      await fetch("/api/booking", {
        method: "POST",
        body: JSON.stringify({
          firstName: "John",
        }),
      });
    })();
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 0) {
      router.push("/");
    }
    setStep(step - 1);
  };

  return (
    <div className="w-full flex flex-col items-center justify-between pt-16 h-[calc(100vh-100px)]">
      <div className="overflow-y-auto h-full w-full flex justify-center pt-4">
        {step === 0 && (
          <ContactInformation
            firstName={firstName}
            lastName={lastName}
            email={email}
            phoneNumber={phoneNumber}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setEmail={setEmail}
            setPhoneNumber={setPhoneNumber}
          />
        )}
        {step === 1 && <Bunnies bunnies={bunnies} setBunnies={setBunnies} />}
        {step === 2 && (
          <Schedule setDateRange={setDateRange} dateRange={dateRange} />
        )}
        {step === 3 && (
          <AdditionalServices
            additionalServices={additionalServices}
            setAdditionalServices={setAdditionalServices}
          />
        )}
        {step === 4 && (
          <Review
            bunnies={bunnies}
            dateRange={dateRange}
            onEditBunnies={() => setStep(1)}
            onEditSchedule={() => setStep(2)}
            onEditContact={() => setStep(0)}
            onEditAdditionalServices={() => setStep(3)}
            onSubmit={() => {}}
            firstName={firstName}
            lastName={lastName}
            email={email}
            phoneNumber={phoneNumber}
            additionalServices={additionalServices}
          />
        )}
      </div>
      {step < 4 ? (
        <div className="flex flex-row gap-4 border-t border-border pt-4 w-full justify-center mt-4">
          <Button onClick={handleBack} variant="outline">
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={step === 4}
            className="bg-sage text-white hover:bg-sage/80"
          >
            Next
          </Button>
        </div>
      ) : (
        <div className="flex flex-row gap-4 border-t border-border pt-4 w-full justify-center">
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="bg-sage text-white hover:bg-sage/80 hover:cursor-pointer hover:text-white"
            >
              Confirm Booking
            </Button>
            {/* Validation Message */}
            {(!dateRange?.from || !dateRange?.to || bunnies.length === 0) && (
              <p className="text-sm text-red-500 text-center">
                Please complete all sections before confirming your booking.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
