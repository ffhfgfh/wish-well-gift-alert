
import { Link } from "react-router-dom";
import { Calendar, Gift, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-birthday-red rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-birthday-dark">WishWell</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Never forget a birthday again. Keep track of important dates and find the perfect gifts for your loved ones.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-birthday-red transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/birthdays" className="text-sm text-gray-600 hover:text-birthday-red transition-colors">
                  Birthdays
                </Link>
              </li>
              <li>
                <Link to="/gifts" className="text-sm text-gray-600 hover:text-birthday-red transition-colors">
                  Gift Ideas
                </Link>
              </li>
              <li>
                <Link to="/add" className="text-sm text-gray-600 hover:text-birthday-red transition-colors">
                  Add Birthday
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="flex items-center space-x-2 mb-2">
              <Mail className="w-4 h-4 text-birthday-red" />
              <span className="text-sm text-gray-600">support@wishwell.com</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6">
          <p className="text-sm text-center text-gray-500">
            &copy; {currentYear} WishWell. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
