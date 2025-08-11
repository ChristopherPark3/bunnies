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

import { useState } from "react";
import { Bunnies } from "./Bunnies";
import { Schedule } from "./Schedule";
import { Button } from "../ui/button";
import { Bunny } from "@/lib/types";
import { Review } from "./Review";
import { DateRange } from "react-day-picker";
import { ContactInformation } from "./ContactInformation";
import { AdditionalServices } from "./AdditionalServices";

export const Booking = () => {
  const [step, setStep] = useState(0);
  const [bunnies, setBunnies] = useState<Bunny[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  return (
    <div className="w-full flex flex-col items-center justify-between pt-20 h-[calc(100vh-100px)]">
      <div className="overflow-y-auto h-full w-full flex justify-center">
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
        {step === 3 && <AdditionalServices />}
        {step === 4 && (
          <Review
            bunnies={bunnies}
            dateRange={dateRange}
            onEditBunnies={() => setStep(1)}
            onEditSchedule={() => setStep(2)}
            onEditContact={() => setStep(0)}
            onSubmit={() => {}}
            firstName={"firstName"}
            lastName={"lastName"}
            email={"email"}
            phoneNumber={"phoneNumber"}
          />
        )}
      </div>
      <div className="flex flex-row gap-4 border-t border-border pt-4 w-full justify-center">
        <Button onClick={handleBack} disabled={step === 0} variant="outline">
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
    </div>
  );
};
