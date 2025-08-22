import { DateRange } from "react-day-picker";

export type Bunny = {
  name: string;
  isVaccinated: boolean;
  isSpayed: boolean;
  isMale: boolean;
  picture?: string;
};

export type Booking = {
  bunnies: Bunny[];
  dateRange: DateRange | undefined;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  additionalServices: AdditionalServices;
};

export type AdditionalServices = {
  sanitaryShaving: boolean;
  nailTrim: boolean;
  medication: boolean;
};
