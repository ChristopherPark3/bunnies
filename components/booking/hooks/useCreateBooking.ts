import { useMutation } from "@tanstack/react-query";
import { Booking } from "@/lib/types";

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: async (booking: Booking) => {
      const response = await fetch("/api/booking", {
        method: "POST",
        body: JSON.stringify(booking),
      });
      if (!response.ok) {
        throw new Error("Failed to create booking");
      }
      return response.json();
    },
  });
};
