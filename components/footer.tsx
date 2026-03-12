import Link from "next/link"
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Azərbaycan Elm Fondu</h3>
            <p className="text-background/70 mb-6 max-w-md">
              Ölkəmizdə elmi tədqiqatların maliyyələşdirilməsi və dəstəklənməsi sahəsində aparıcı qurum. 
              Elmin inkişafı üçün birlikdə çalışırıq.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-background/50 hover:text-background transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-background/50 hover:text-background transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-background/50 hover:text-background transition-colors">
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Sürətli Keçidlər</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-background/70 hover:text-background transition-colors">
                  Haqqımızda
                </Link>
              </li>
              <li>
                <Link href="/grants" className="text-background/70 hover:text-background transition-colors">
                  Qrantlar
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-background/70 hover:text-background transition-colors">
                  Xəbərlər
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-background/70 hover:text-background transition-colors">
                  Əlaqə
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Əlaqə Məlumatları</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-background/50" />
                <span className="text-background/70 text-sm">
                  Bakı şəhəri, Nəsimi rayonu
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-background/50" />
                <span className="text-background/70 text-sm">
                  +994 12 123 45 67
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-background/50" />
                <span className="text-background/70 text-sm">
                  info@aef.gov.az
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/50 text-sm">
            © 2026 Azərbaycan Elm Fondu. Bütün hüquqlar qorunur.
          </p>
        </div>
      </div>
    </footer>
  )
}
