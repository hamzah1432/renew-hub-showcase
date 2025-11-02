import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  CreditCard,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Logo and Social */}
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="rounded-lg flex items-center justify-center">
                <img
                  src="PREI_logo.png"
                  alt="Professional Renewable Energy Institute"
                  className="h-20 md:h-24 object-contain"
                />
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center justify-center md:justify-start space-x-2">
                <a 
                  href="https://www.facebook.com/ProfessionalRenewableEnergyInstitute?mibextid=ZbWKwL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#111111] rounded hover:bg-gray-700 transition-colors"
                >
                  <Facebook className="h-5 w-5" fill="currentColor" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/professional-renewable-energy-institute/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-[#111111] rounded hover:bg-gray-700 transition-colors"
                >
                  <Linkedin className="h-5 w-5" fill="currentColor" />
                </a>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3 flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-3">
                {/* MasterCard */}
                <img className="h-6 md:h-8" src="https://professional-institute.com/wp-content/uploads/2019/02/Mastercard-Download-PNG-1-300x192.png" alt="MasterCard" />
                {/* Visa */}
                <img className="h-6 md:h-8" src="https://professional-institute.com/wp-content/uploads/2019/02/Old_Visa_Logo-1-300x191.png" alt="Visa" />
              </div>
              {/* PayPal */}
              <img className="h-5 md:h-6" src="https://professional-institute.com/wp-content/uploads/2019/02/pp_fc_hl-1.png" alt="PayPal" />
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-sm"></div>
                <a href="https://professional-institute.com/about-us/">
                  <button className="text-gray-300 hover:text-white transition-colors">
                    About
                  </button>
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-sm"></div>
                <a href="https://professional-institute.com/become-an-instructor/">
                  <button className="text-gray-300 hover:text-white transition-colors">
                    Become An Instructor
                  </button>
                </a>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mt-8">Links</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-sm"></div>
                <a href="https://professional-institute.com/courses/">
                  <button className="text-gray-300 hover:text-white transition-colors">
                    Courses
                  </button>
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-sm"></div>
                <button className="text-gray-300 hover:text-white transition-colors">
                  FAQs
                </button>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-lg font-semibold text-white text-center md:text-left">Contact</h3>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Phone className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm md:text-base">(+962) - 79 851 4247</span>
              </div>

              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Phone className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm md:text-base">(+49) 17 62 773 43 23</span>
              </div>

              <div className="flex items-start justify-center md:justify-start space-x-3">
                <MapPin className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300 text-sm md:text-base text-center md:text-left">
                  <div>Efendi Gewerbegebäude,</div>
                  <div>Jakobstraße, Augsburg, Germany</div>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Mail className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm md:text-base break-all">info@professional-institute.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 md:mt-12 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-xs md:text-sm text-center md:text-left">
              © P.R.E.I 2023. All Rights Reserved.
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-xs md:text-sm">
              <a href="https://professional-institute.com/privacy-policy/">
                <button className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </a>
              <a href="https://professional-institute.com/cancellation-policy/">
                <button className="text-gray-400 hover:text-white transition-colors">
                  Cancellation Policy
                </button>
              </a>
              <a href="https://professional-institute.com/refund-policy/">
                <button className="text-gray-400 hover:text-white transition-colors">
                  Refund Policy
                </button>
              </a>
              <a href="https://professional-institute.com/lp-term-conditions/">
                <button className="text-gray-400 hover:text-white transition-colors">
                  Terms and Conditions
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
