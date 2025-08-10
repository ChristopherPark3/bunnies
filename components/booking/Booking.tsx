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

export const Booking = () => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      {step === 0 && <Bunnies onNext={handleNext} />}
      {step === 1 && <Schedule onNext={handleNext} onBack={handleBack} />}
    </div>
  );
};
