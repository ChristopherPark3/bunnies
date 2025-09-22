"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Maintenance } from "@/components/Maintenence";
import { Loader2 } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isUnderMaintenance, setIsUnderMaintenance] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchIsUnderMaintenance = async () => {
      setIsLoading(true);
      const response = await fetch("/api/status");
      const data = await response.json();
      setIsUnderMaintenance(data.isUnderMaintenance);
      setIsLoading(false);
    };
    fetchIsUnderMaintenance();
  }, []);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          {isLoading ? (
            <div className="flex items-center justify-center h-screen">
              <div className="flex flex-row gap-2 items-center text-gray-500">
                <Loader2 className="size-6 animate-spin" />
              </div>
            </div>
          ) : isUnderMaintenance ? (
            <Maintenance />
          ) : (
            children
          )}
        </QueryClientProvider>
      </body>
    </html>
  );
}
