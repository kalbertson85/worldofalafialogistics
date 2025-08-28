import { Facebook, Instagram, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Offers", href: "#offers" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="bg-background border-t border-border">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <div className="flex items-center space-x-3 group">
                <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full overflow-hidden border-3 border-yellow-500 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <img 
                    src="/logo/AlafiaLogo.jpeg" 
                    alt="World of Alafia Logo"
                    className="w-full h-full object-cover"
                    width={80}
                    height={80}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 rounded-full border-2 border-yellow-300/50 animate-pulse-slow pointer-events-none" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">World of Alafia Logistics</h3>
                  <p className="text-sm text-muted-foreground">Your Trusted Business Platform</p>
                </div>
              </div>
            </Link>
            <p className="text-muted-foreground">
              Connecting service users with trusted service providers across Sierra Leone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">134 Njalu Road, Bo, Sierra Leone</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">+232 76 865694</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">info@worldofalafia.com</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-section-bg rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-section-bg rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/23276865694" 
                className="w-10 h-10 bg-section-bg rounded-full flex items-center justify-center text-muted-foreground hover:text-trust hover:bg-trust/10 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-secondary py-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-secondary-foreground">
            <p>&copy; 2025 World of Alafia Logistics. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;