import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-500 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="font-semibold text-xl text-gray-900">DiabetesAI</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Empowering better diabetes care through intelligent technology.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-gray-900">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#careers" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Careers
                </a>
              </li>
              <li>
                <a href="#press" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Press
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-gray-900">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#privacy" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#hipaa" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  HIPAA Compliance
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-gray-900">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#help" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#faq" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
            <p className="text-xs text-gray-700 leading-relaxed"> This platform is designed to assist with diabetes management and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of information provided by this platform.<strong className="text-blue-900">Medical Disclaimer:</strong></p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} DiabetesAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
