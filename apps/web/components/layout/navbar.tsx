"use client";
import clsx from "clsx";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Button } from "../ui/button";
import LogoutButton from "../auth/logout-button";

type NavbarProps = {
  isAuthenticated: boolean;
};

type NavLinksProps = {
  isAuthenticated: boolean;
  onClick?: () => void;
};

export default function Navbar({ isAuthenticated }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <nav className="bg-gray-100 shadow-md w-full z-50">
      <div className="px-4 xl:px-0 max-w-7xl mx-auto py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl text-black flex items-center gap-2 font-semibold"
        >
          <span className="text-xl text-gray-600">TicketBooking</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          <NavLinks isAuthenticated={isAuthenticated} />
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
          <NavLinks isAuthenticated={isAuthenticated} onClick={closeMenu} />
        </div>
      </div>
    </nav>
  );
}

function NavLinks({ isAuthenticated, onClick }: NavLinksProps) {
  const pathName = usePathname();

  const links = useMemo(
    () => [
      {
        key: "booking-list",
        href: "/booking-list",
        label: "Booking list",
        isActive: pathName === "/booking-list",
        needAccess: true,
      },
      {
        key: "booking-configs",
        href: "/booking-configs",
        label: "Config",
        isActive: pathName === "/booking-configs",
        needAccess: true,
      },
      {
        key: "login",
        href: "/auth/login",
        label: "Login",
        isActive: pathName === "/login",
        needAccess: false,
      },
    ],
    [pathName]
  );

  const filteredLinks = links.filter((link) => {
    if (link.key === "login" && isAuthenticated) return false;
    if (link.needAccess && !isAuthenticated) return false;
    return true;
  });

  const navClass =
    "text-gray-700 font-medium bg-gradient-to-r from-black to-black bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-all duration-100 hover:text-black";
  const isActiveClass = "bg-[length:100%_2px] text-black";

  return (
    <>
      {filteredLinks.map((item) => (
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
      {isAuthenticated && <LogoutButton />}
    </>
  );
}
