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

export const Booking = () => {
  const [step, setStep] = useState(0);
  const [bunnies, setBunnies] = useState<Bunny[]>([]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  return (
    <div className="w-full flex flex-col items-center justify-between pt-20 h-[calc(100vh-100px)]">
      <div className="overflow-y-auto h-full w-full flex justify-center">
        {step === 0 && <Bunnies bunnies={bunnies} setBunnies={setBunnies} />}
        {step === 1 && <Schedule />}
      </div>
      <div className="flex flex-row gap-4 border-t border-border pt-4 w-full justify-center">
        <Button onClick={handleBack} disabled={step === 0} variant="outline">
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={step === 1}
          className="bg-sage text-white hover:bg-sage/80"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
