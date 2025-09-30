import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="space-y-4 col-span-2">
            <h3 className="text-2xl font-bold text-primary">Guzarishh</h3>
            <p className="text-sm text-muted-foreground">
              Premium Indian women fashion brand based in Dubai.<br /> 
              Bringing you the finest traditional and contemporary styles.
            </p>
            <div className="flex space-x-4">
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/products" className="text-muted-foreground hover:text-primary">Products</a></li>
              <li><a href="/faq" className="text-muted-foreground hover:text-primary">FAQ</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-primary">Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/returns" className="text-muted-foreground hover:text-primary">Returns & Exchanges</a></li>
              <li><a href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</a></li>
              <li><a href="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold">Contact Info</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Dubai, UAE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">+971 XX XXX XXXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">info@guzarishh.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Guzarishh. All rights reserved. | Registered in Dubai, UAE</p>
        </div>
      </div>
    </footer>
  )
}
