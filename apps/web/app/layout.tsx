import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
import BookingSocketWrapper from "@/components/bookings/booking-socket-wrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Ticket Booking",
  description: "Book your ticket fast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <Header />
          <BookingSocketWrapper>
            <main>
              {children}
            </main>
          </BookingSocketWrapper>
          <Toaster
            visibleToasts={2}
            expand
            theme="light"
            richColors
            closeButton
            duration={2000}
          />
        </Providers>
      </body>
    </html>
  );
}
