import Link from "next/link"
import { Mail, Twitter, Linkedin, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-foreground font-bold">R</span>
              </div>
              <span className="text-xl font-bold text-primary">RWA</span>
            </div>
            <p className="text-primary-foreground/70 text-sm">
              Democratizing real estate investment through blockchain technology.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link href="#" className="hover:text-primary transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link href="#" className="hover:text-primary transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link href="#" className="hover:text-primary transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-primary-foreground/70">© 2025 RWA. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-primary-foreground/70 hover:text-primary transition">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="text-primary-foreground/70 hover:text-primary transition">
              <Linkedin size={20} />
            </Link>
            <Link href="#" className="text-primary-foreground/70 hover:text-primary transition">
              <Mail size={20} />
            </Link>
            <Link href="#" className="text-primary-foreground/70 hover:text-primary transition">
              <Github size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
