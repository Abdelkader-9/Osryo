import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-secondary text-accent py-12 rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">OSRYO</h3>
            <p className="text-sm opacity-80">
              A modern digital agency creating beautiful digital experiences.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-primary">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="opacity-80 hover:opacity-100 transition-opacity">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/services" className="opacity-80 hover:opacity-100 transition-opacity">
                  Web Design
                </Link>
              </li>
              <li>
                <Link href="/services" className="opacity-80 hover:opacity-100 transition-opacity">
                  Development
                </Link>
              </li>
              <li>
                <Link href="/services" className="opacity-80 hover:opacity-100 transition-opacity">
                  Strategy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-primary">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/team" className="opacity-80 hover:opacity-100 transition-opacity">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="opacity-80 hover:opacity-100 transition-opacity">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/blog" className="opacity-80 hover:opacity-100 transition-opacity">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="opacity-80 hover:opacity-100 transition-opacity">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-primary">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:hello@studio.com" className="opacity-80 hover:opacity-100 transition-opacity">
                  hello@studio.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="opacity-80 hover:opacity-100 transition-opacity">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="pt-4">
                <div className="flex gap-3">
                  <a href="#" className="opacity-80 hover:opacity-100 transition-opacity" aria-label="Twitter">
                    Twitter
                  </a>
                  <a href="#" className="opacity-80 hover:opacity-100 transition-opacity" aria-label="LinkedIn">
                    LinkedIn
                  </a>
                  <a href="#" className="opacity-80 hover:opacity-100 transition-opacity" aria-label="GitHub">
                    GitHub
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground border-opacity-20 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2024 Osryo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
