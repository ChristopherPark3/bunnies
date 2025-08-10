"use client";

import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { DateRange } from "react-day-picker";
import { Button } from "../ui/button";

interface ScheduleProps {
  onNext: () => void;
  onBack: () => void;
}

export const Schedule = ({ onNext, onBack }: ScheduleProps) => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-[800px] ">
      <Calendar
        mode="range"
        defaultMonth={new Date()}
        numberOfMonths={2}
        selected={date}
        onSelect={setDate}
        className="rounded-lg border shadow-sm"
      />
      <div className="flex flex-row w-full justify-between">
        <Button onClick={onBack}>Back</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};
