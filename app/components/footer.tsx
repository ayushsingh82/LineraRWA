import Link from "next/link"
import { Mail, Twitter, Linkedin, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">R</span>
            </div>
            <span className="text-xl font-bold text-foreground">RWA Tokenization Platform</span>
          </div>

          <div className="flex gap-6">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition">
              <Twitter size={18} />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition">
              <Linkedin size={18} />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition">
              <Mail size={18} />
            </Link>
          </div>
        </div>

        <div className="border-t border-border/20 mt-6 pt-4 text-center">
          <p className="text-sm text-muted-foreground">© 2025 RWA Tokenization. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
