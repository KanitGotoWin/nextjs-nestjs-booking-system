"use client";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Button } from "../ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <nav className="bg-white shadow-md w-full z-50">
      <div className="px-4 xl:px-0 max-w-5xl mx-auto py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl text-black flex items-center gap-2 font-semibold"
        >
          <span className="text-xl text-gray-600">TicketBooking</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          <NavLinks />
        </div>

        {/* Mobile Toggle Button */}
        <button
          aria-label="Navbar toggle button"
          className="md:hidden"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={clsx(
          "overflow-hidden transition-all duration-300 md:hidden px-4",
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col items-center gap-2 pb-4">
          <NavLinks onClick={closeMenu} />
        </div>
      </div>
    </nav>
  );
}

function NavLinks({ onClick }: { onClick?: () => void }) {
  const pathName = usePathname();

  // List of menu links
  const links = useMemo(
    () => [
      {
        key: "booking-configs",
        href: "/booking-configs",
        label: "Booking Config",
        isActive: pathName === "/booking-configs",
      },
      {
        key: "login",
        href: "/login",
        label: "Login",
        isActive: pathName === "/login",
      },
    ],
    [pathName]
  );

  const navClass =
    "text-gray-700 font-medium bg-gradient-to-r from-black to-black bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-all duration-100 hover:text-black";
  const isActiveClass = "bg-[length:100%_2px] text-black";

  return (
    <>
      {links.map((item) => (
        <Link
          key={item.key}
          href={item.href}
          onClick={onClick}
          className={`${navClass} ${item.isActive ? isActiveClass : ""} ${
            item.key !== "login" ? "hover:bg-[length:100%_1px]" : ""
          }`}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}
