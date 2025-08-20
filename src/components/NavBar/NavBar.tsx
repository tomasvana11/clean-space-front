"use client";

import { useState } from "react";
import Link from "next/link";
import { NavBarProps, NavItem } from "./NavBar.types";
import { Button } from "@/components/Button";
import { Image } from "@/components/Image";
import { t, locales, Locale } from "@/utils/i18n";
import { ContentWrapper } from "../ContentWrapper";

export const NavBar = ({ locale }: NavBarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: t(locale, "navbar.home"), href: `/${locale}` },
    { label: t(locale, "navbar.services"), href: `/${locale}/services` },
    { label: t(locale, "navbar.about"), href: `/${locale}/about` },
    { label: t(locale, "navbar.contact"), href: `/${locale}/contact` },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#1A1A1A]/50 backdrop-blur-md h-[72px] md:h-[96px]">
      <ContentWrapper className="h-full">
        <div className="flex items-center justify-between h-full">
          {/* Left side - Logo + Language switcher */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex-shrink-0">
              <div className="relative w-auto h-10 md:h-16">
                <Image
                  src="/images/cleanspace_logo_white.svg"
                  alt="CleanSpace Logo"
                  width={150}
                  height={64}
                  className="h-10 md:h-16 w-auto object-contain"
                />
              </div>
            </Link>

            {/* Language switcher - Desktop */}
            <div className="hidden md:flex space-x-2">
              {locales.map((lang) => (
                <Link
                  key={lang}
                  href={`/${lang}`}
                  className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
                    locale === lang
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                  }`}
                >
                  {lang.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side - CTA Button (Desktop) + Mobile menu button */}
          {/* Navigation links (Desktop) */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            {/* CTA Button - Desktop */}
            <div className="hidden md:block">
              <Link href={`/${locale}/contact`}>
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-[#FFAC00] text-white hover:bg-[#FFA000] font-semibold px-8 text-[16px]"
                >
                  {t(locale, "navbar.orderCleaning") || "Order cleaning"}
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-4">
              {/* Language switcher - Mobile */}
              <div className="flex space-x-2 pb-4 border-b border-gray-200">
                {locales.map((lang) => (
                  <Link
                    key={lang}
                    href={`/${lang}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                      locale === lang
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </Link>
                ))}
              </div>

              {/* Navigation links - Mobile */}
              <div className="space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-gray-700 hover:text-blue-600 font-medium py-2"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* CTA Button - Mobile */}
              <div className="pt-4 border-t border-gray-200">
                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="primary" size="md" fullWidth>
                    {t(locale, "navbar.orderCleaning")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </ContentWrapper>
    </nav>
  );
};
