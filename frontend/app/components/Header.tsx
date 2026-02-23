'use client'

import Link from 'next/link'
import {useState} from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="w-full py-5 md:py-6">
      <div className="container">
        <div className="flex items-center justify-between">
          {/* ---- Logo ---- */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            {/* Logomark */}
            <div className="relative size-8 rounded-lg bg-primary flex items-center justify-center overflow-hidden">
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M2 7L6 11L10 3L14 11L18 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="font-display font-medium text-[19px] text-white tracking-[-0.39px]">
              Webkowsky
            </span>
          </Link>

          {/* ---- Desktop Navigation ---- */}
          <nav className="hidden md:flex items-center gap-16 lg:gap-20">
            <div className="flex items-center gap-12 lg:gap-20">
              <Link
                href="/"
                className="font-display font-medium text-[19px] text-white tracking-[-0.39px] hover:text-white/80 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="font-display font-medium text-[19px] text-white tracking-[-0.39px] hover:text-white/80 transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="font-display font-medium text-[19px] text-white tracking-[-0.39px] hover:text-white/80 transition-colors"
              >
                Contact
              </Link>
            </div>
          </nav>

          {/* ---- CTA Button (desktop) ---- */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center justify-center rounded-[12px] bg-primary px-4 py-3 font-sans font-bold text-base text-white tracking-[-0.24px] hover:bg-primary-hover transition-colors"
          >
            Contact us
          </Link>

          {/* ---- Mobile menu button ---- */}
          <button
            type="button"
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-transform duration-200 ${mobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-transform duration-200 ${mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </button>
        </div>

        {/* ---- Mobile Navigation ---- */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-80 opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col gap-4 pb-4">
            <Link
              href="/"
              className="font-display font-medium text-lg text-white hover:text-white/80 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="font-display font-medium text-lg text-white hover:text-white/80 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="font-display font-medium text-lg text-white hover:text-white/80 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="mt-2 inline-flex items-center justify-center rounded-[12px] bg-primary px-4 py-3 font-sans font-bold text-base text-white tracking-[-0.24px]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
