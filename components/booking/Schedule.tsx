"use client";

import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { DateRange } from "react-day-picker";
import { Button } from "../ui/button";

export const Schedule = () => {
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
    </div>
  );
};
