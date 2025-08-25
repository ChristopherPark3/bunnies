"use client";

import { Clock, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import confetti from "canvas-confetti";
import { useEffect } from "react";
import { motion } from "framer-motion";

export const BookingSuccess = () => {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="min-h-screen bg-sage/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
      >
        <Card className="w-full max-w-2xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            {/* Main Heading */}
            <motion.h1 
              className="text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Booking Request Submitted! 🎉
            </motion.h1>

            {/* Success Message */}
            <motion.p 
              className="text-lg text-gray-600 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Thank you for choosing our bunny boarding service! Your booking
              request has been successfully created and is now in our review
              queue.
            </motion.p>

            {/* What Happens Next */}
            <motion.div 
              className="bg-blue-50 rounded-lg p-6 mb-6 text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h2 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                What happens next?
              </h2>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  We&apos;ll review your request within 24 hours
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  Check availability for your requested dates
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  Send you a confirmation email with next steps
                </li>
              </ul>
            </motion.div>

            {/* Contact Information */}
            <motion.div 
              className="bg-gray-50 rounded-lg p-6 mb-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Need to make changes?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Email us at info@bunnyboarding.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Call (555) 123-4567</span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/")}
                className="flex-1 sm:flex-none"
              >
                Return Home
              </Button>
              <Button
                onClick={() => (window.location.href = "/booking")}
                className="flex-1 sm:flex-none"
              >
                Book Another Stay
              </Button>
            </motion.div>

            {/* Thank You Note */}
            <motion.p 
              className="text-sm text-gray-500 mt-6 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              Thank you for your patience and for trusting us with your beloved
              bunnies! 🐰
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
