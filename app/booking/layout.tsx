import { NavigationBar } from "@/components/general/navigation-bar";

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavigationBar isBooking={true} />
      {children}
    </div>
  );
}
