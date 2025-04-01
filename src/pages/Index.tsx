
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gift, Calendar, Bell } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { differenceInDays, format } from "date-fns";
import { Birthday } from "@/types/birthday";
import { mockGifts } from "@/data/mockGifts";

const Index = () => {
  const [upcomingBirthdays, setUpcomingBirthdays] = useState<Birthday[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch from an API
    const storedBirthdays = JSON.parse(localStorage.getItem("birthdays") || "[]");
    
    // Sort by upcoming date and take top 3
    const sorted = sortBirthdaysByUpcoming(storedBirthdays).slice(0, 3);
    setUpcomingBirthdays(sorted);
    setLoading(false);
  }, []);

  const sortBirthdaysByUpcoming = (birthdays: Birthday[]) => {
    return [...birthdays].sort((a, b) => {
      const dateA = new Date(a.birthDate);
      const dateB = new Date(b.birthDate);
      const today = new Date();
      
      const nextBirthdayA = getNextBirthday(dateA);
      const nextBirthdayB = getNextBirthday(dateB);
      
      return differenceInDays(nextBirthdayA, today) - differenceInDays(nextBirthdayB, today);
    });
  };

  const getNextBirthday = (birthDate: Date) => {
    const today = new Date();
    const nextBirthday = new Date(birthDate);
    nextBirthday.setFullYear(today.getFullYear());
    
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    return nextBirthday;
  };

  const getDaysUntil = (birthDate: string) => {
    const today = new Date();
    const nextBirthday = getNextBirthday(new Date(birthDate));
    return differenceInDays(nextBirthday, today);
  };

  // Create confetti elements for decoration
  const renderConfetti = () => {
    const confettiColors = ["bg-birthday-red", "bg-birthday-yellow", "bg-birthday-teal"];
    const confettiElements = [];
    
    for (let i = 0; i < 15; i++) {
      const left = `${Math.random() * 100}%`;
      const animationDelay = `${Math.random() * 3}s`;
      const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      
      confettiElements.push(
        <div 
          key={i}
          className={`confetti ${color}`}
          style={{ 
            left, 
            animationDelay,
            animation: 'confetti 5s ease-in-out forwards',
            top: '-20px',
          }}
        />
      );
    }
    
    return confettiElements;
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white to-gray-50 py-16 md:py-24 overflow-hidden">
        {renderConfetti()}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-birthday-dark mb-4">
              Never Forget a Birthday Again
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Keep track of important dates and find the perfect gifts for your loved ones.
            </p>
            
            <div className="flex justify-center space-x-4">
              <Link to="/add">
                <Button className="bg-birthday-red hover:bg-birthday-red/90 text-lg py-6 px-8">
                  Add a Birthday
                </Button>
              </Link>
              <Link to="/birthdays">
                <Button variant="outline" className="text-lg py-6 px-8">
                  View All Birthdays
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="hidden md:block absolute bottom-0 left-0 w-24 h-24 transform translate-y-1/2">
          <div className="w-full h-full bg-birthday-yellow rounded-full opacity-30 animate-float" />
        </div>
        <div className="hidden md:block absolute top-16 right-16 w-16 h-16">
          <div className="w-full h-full bg-birthday-teal rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }} />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-birthday-dark">How It Works</h2>
            <p className="text-gray-600 mt-2">Simple steps to never miss a birthday again</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-birthday-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-birthday-red" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Add Birthdays</h3>
              <p className="text-gray-600">
                Enter the name, date, and details of the people you care about.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-birthday-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-birthday-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Reminders</h3>
              <p className="text-gray-600">
                Set custom notifications so you'll always remember important dates.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-birthday-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-birthday-yellow" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Perfect Gifts</h3>
              <p className="text-gray-600">
                Get personalized gift suggestions based on relationship and interests.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Upcoming Birthdays Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-birthday-dark">Upcoming Birthdays</h2>
            <Link to="/birthdays" className="text-birthday-red hover:text-birthday-red/80 flex items-center font-medium">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid gap-6">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-20 bg-gray-200 rounded-xl w-full"></div>
                <div className="h-20 bg-gray-200 rounded-xl w-full"></div>
                <div className="h-20 bg-gray-200 rounded-xl w-full"></div>
              </div>
            ) : upcomingBirthdays.length > 0 ? (
              upcomingBirthdays.map((birthday) => {
                const daysUntil = getDaysUntil(birthday.birthDate);
                const birthDate = new Date(birthday.birthDate);
                
                return (
                  <div 
                    key={birthday.id} 
                    className="flex justify-between items-center bg-white p-4 rounded-xl border shadow-sm"
                  >
                    <div className="flex items-center">
                      <div className="mr-4 flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-birthday-red/10 flex items-center justify-center">
                          <Calendar className="h-6 w-6 text-birthday-red" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{birthday.name}</h3>
                        <p className="text-sm text-gray-500">
                          {format(birthDate, "MMMM d")} • {birthday.relationship}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold text-lg ${
                        daysUntil <= 7 ? "text-birthday-red" : "text-birthday-teal"
                      }`}>
                        {daysUntil === 0 ? "Today!" : daysUntil === 1 ? "Tomorrow!" : `${daysUntil} days`}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 bg-white rounded-xl border">
                <div className="w-16 h-16 bg-birthday-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-birthday-yellow" />
                </div>
                <h3 className="text-lg font-medium mb-2">No birthdays added yet</h3>
                <p className="text-gray-500 mb-4">Add your first birthday to get started</p>
                <Link to="/add">
                  <Button className="bg-birthday-red hover:bg-birthday-red/90">
                    Add Birthday
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Gift Ideas Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-birthday-dark">Popular Gift Ideas</h2>
            <p className="text-gray-600 mt-2">Find the perfect present for any occasion</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockGifts.slice(0, 4).map((gift) => (
              <div key={gift.id} className="gift-item">
                <div className="relative pb-[100%] overflow-hidden rounded-md mb-3">
                  <img 
                    src={gift.image} 
                    alt={gift.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-birthday-dark">{gift.name}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{gift.description}</p>
                <p className="text-sm font-medium text-birthday-teal mt-2">${gift.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/gifts">
              <Button variant="outline" className="px-8">
                Browse All Gifts <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-birthday-teal/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-birthday-dark mb-4">Ready to Keep Track of Important Dates?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Add your first birthday reminder and never miss a celebration again.
          </p>
          <Link to="/add">
            <Button className="bg-birthday-red hover:bg-birthday-red/90 text-lg py-6 px-8">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
