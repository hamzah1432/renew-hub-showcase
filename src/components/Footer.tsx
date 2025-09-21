import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 gradient-primary-500 rounded-lg flex items-center justify-center">
                <img
                  src="PREI_logo.png"
                  alt="Professional Institute Renewable Energy Engineering"
                />
              </div>
              <div>
                <div className="text-xl font-bold">Professional Institute</div>
                <div className="text-sm text-white/80">
                  Renewable Energy Engineering
                </div>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">
              Leading provider of renewable energy engineering education and
              professional development programs. Empowering the next generation
              of sustainable energy experts.
            </p>
            <div className="flex space-x-4">
              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Linkedin className="h-5 w-5" />
              </button>
              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Instagram className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                "About Us",
                "Our Courses",
                "Certification Programs",
                "Corporate Training",
                "Success Stories",
                "Career Support",
              ].map((link) => (
                <li key={link}>
                  <button className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-300">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Programs</h3>
            <ul className="space-y-3">
              {[
                "Solar Energy Engineering",
                "Wind Power Systems",
                "Energy Storage Technology",
                "Smart Grid Solutions",
                "Green Building Design",
                "Sustainable Engineering",
              ].map((program) => (
                <li key={program}>
                  <button className="text-white/80 hover:text-white transition-colors hover:translate-x-1 transform duration-300">
                    {program}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-white/80">
                  <div>123 Green Energy Plaza</div>
                  <div>Sustainable City, SC 12345</div>
                  <div>United States</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="text-white/80">+1 (555) 123-4567</div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="text-white/80">
                  info@professionalinstitute.com
                </div>
              </div>

              <div className="pt-4">
                <div className="text-sm text-white/60">
                  <div className="mb-1">Mon - Fri: 8:00 AM - 6:00 PM</div>
                  <div className="mb-1">Sat: 9:00 AM - 4:00 PM</div>
                  <div>Sun: Closed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © 2024 Professional Institute. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <button className="text-white/60 hover:text-white transition-colors">
                Privacy Policy
              </button>
              <button className="text-white/60 hover:text-white transition-colors">
                Terms of Service
              </button>
              <button className="text-white/60 hover:text-white transition-colors">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
