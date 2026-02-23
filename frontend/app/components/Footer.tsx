import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-auto">
      <div className="container py-8 sm:py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Logo / brand */}
          <Link href="/" className="font-display font-medium text-lg text-white">
            Webkowsky
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Webkowsky
          </p>
        </div>
      </div>
    </footer>
  )
}
