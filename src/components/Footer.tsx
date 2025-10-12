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
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Social */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="   rounded-lg flex items-center justify-center">
                <img
                  src="PREI_logo.png"
                  alt="Professional Renewable Energy Institute"
                  className="h-24  object-contain"
                />
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-2">
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
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                {/* MasterCard */}
                <img className="h-8" src="https://professional-institute.com/wp-content/uploads/2019/02/Mastercard-Download-PNG-1-300x192.png" alt="" />
                {/* Visa */}
                <img className="h-8" src="https://professional-institute.com/wp-content/uploads/2019/02/Old_Visa_Logo-1-300x191.png" alt="" />
              </div>
              {/* PayPal */}
              <img className="h-6" src="https://professional-institute.com/wp-content/uploads/2019/02/pp_fc_hl-1.png" alt="" />
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Company</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-sm"></div>
                <button className="text-gray-300 hover:text-white transition-colors">
                  About
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-sm"></div>
                <button className="text-gray-300 hover:text-white transition-colors">
                  Become An Instructor
                </button>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mt-8">Links</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-sm"></div>
                <button className="text-gray-300 hover:text-white transition-colors">
                  Courses
                </button>
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
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">(+962) - 79 851 4247</span>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">(+49) 17 62 773 43 23</span>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <div>Efendi Gewerbegebäude,</div>
                  <div>Jakobstraße, Augsburg, Germany</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">info@professional-institute.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © P.R.E.I 2023. All Rights Reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <button className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Cancellation Policy
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Refund Policy
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                Terms and Conditions
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
