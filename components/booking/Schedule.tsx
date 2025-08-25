"use client";

import { Calendar } from "../ui/calendar";
import { DateRange } from "react-day-picker";
import { Button } from "../ui/button";
import { RotateCcw } from "lucide-react";
import dayjs from "dayjs";

interface ScheduleProps {
  dateRange: DateRange | undefined;
  setDateRange: (dateRange: DateRange | undefined) => void;
}

export const Schedule = ({ dateRange, setDateRange }: ScheduleProps) => {
  return (
    <div className="flex flex-col h-full w-fit items-center gap-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold text-gray-800 select-none">
          When are you coming?
        </h1>
        <p className="text-sm text-gray-500 select-none">
          Select the range of dates you will be boarding the bunnies.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Calendar
          mode="range"
          defaultMonth={new Date()}
          numberOfMonths={1}
          selected={dateRange}
          onSelect={setDateRange}
          className="rounded-lg border shadow-sm w-64 md:w-84"
        />
        <div className="flex flex-row gap-2 w-full justify-between items-center">
          <p className="text-sm text-gray-500 font-medium">
            {dateRange?.from && dateRange?.to
              ? `${dayjs(dateRange.from).format("MMM D")} - ${dayjs(
                  dateRange.to
                ).format("MMM D, YYYY")}`
              : "No date selected"}
          </p>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setDateRange(undefined)}
            className="group"
          >
            <RotateCcw className="group-hover:-rotate-180 transition-transform duration-300" />
            <p>Reset</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
