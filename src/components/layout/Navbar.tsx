
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Gift, Home, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-birthday-red rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-birthday-dark">WishWell</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" className="flex items-center space-x-1">
                <Home size={18} />
                <span>Home</span>
              </Button>
            </Link>
            <Link to="/birthdays">
              <Button variant="ghost" className="flex items-center space-x-1">
                <Calendar size={18} />
                <span>Birthdays</span>
              </Button>
            </Link>
            <Link to="/gifts">
              <Button variant="ghost" className="flex items-center space-x-1">
                <Gift size={18} />
                <span>Gift Ideas</span>
              </Button>
            </Link>
            <Link to="/add">
              <Button className="bg-birthday-red hover:bg-birthday-red/90">Add Birthday</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" onClick={toggleMenu} className="p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-md">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/birthdays" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted" onClick={toggleMenu}>
              Birthdays
            </Link>
            <Link to="/gifts" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted" onClick={toggleMenu}>
              Gift Ideas
            </Link>
            <Link to="/add">
              <Button className="bg-birthday-red hover:bg-birthday-red/90 w-full mt-2" onClick={toggleMenu}>
                Add Birthday
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
