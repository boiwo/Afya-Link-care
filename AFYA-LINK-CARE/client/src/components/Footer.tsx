import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
              </div>
              <span className="text-xl font-bold text-foreground">AfyaLink</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting communities to quality healthcare across Kenya.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/clinics" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Find Clinics
                </a>
              </li>
              <li>
                <a href="/articles" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Health Articles
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Clinic Directory</li>
              <li className="text-sm text-muted-foreground">Appointment Booking</li>
              <li className="text-sm text-muted-foreground">Health Resources</li>
              <li className="text-sm text-muted-foreground">Emergency Services</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                info@afyalink.co.ke
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                +254 700 000 000
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Nairobi, Kenya
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 AfyaLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
