
import { useState, useEffect } from "react";
import BirthdayCard from "./BirthdayCard";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Birthday } from "@/types/birthday";

const BirthdayList = () => {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch from an API
    const storedBirthdays = JSON.parse(localStorage.getItem("birthdays") || "[]");
    setBirthdays(storedBirthdays);
    setIsLoading(false);
  }, []);

  const handleDelete = (id: string) => {
    const updatedBirthdays = birthdays.filter(birthday => birthday.id !== id);
    setBirthdays(updatedBirthdays);
    localStorage.setItem("birthdays", JSON.stringify(updatedBirthdays));
  };

  // Filter birthdays based on search term
  const filteredBirthdays = birthdays.filter(birthday => 
    birthday.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort birthdays by upcoming date
  const sortedBirthdays = [...filteredBirthdays].sort((a, b) => {
    const dateA = new Date(a.birthDate);
    const dateB = new Date(b.birthDate);
    const today = new Date();
    
    // Calculate next birthday for both
    const nextBirthdayA = new Date(dateA);
    nextBirthdayA.setFullYear(today.getFullYear());
    if (nextBirthdayA < today) {
      nextBirthdayA.setFullYear(today.getFullYear() + 1);
    }
    
    const nextBirthdayB = new Date(dateB);
    nextBirthdayB.setFullYear(today.getFullYear());
    if (nextBirthdayB < today) {
      nextBirthdayB.setFullYear(today.getFullYear() + 1);
    }
    
    return nextBirthdayA.getTime() - nextBirthdayB.getTime();
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-birthday-dark">Birthday Reminders</h1>
        <Link to="/add">
          <Button className="bg-birthday-red hover:bg-birthday-red/90">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Birthday
          </Button>
        </Link>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          type="text"
          placeholder="Search birthdays..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-48 bg-gray-200 rounded-xl w-full"></div>
            <div className="h-48 bg-gray-200 rounded-xl w-full"></div>
          </div>
        </div>
      ) : sortedBirthdays.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedBirthdays.map(birthday => (
            <BirthdayCard 
              key={birthday.id} 
              birthday={birthday} 
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-xl bg-gray-50">
          <div className="w-16 h-16 bg-birthday-yellow/20 rounded-full flex items-center justify-center mx-auto">
            <Calendar className="h-8 w-8 text-birthday-yellow" />
          </div>
          <h3 className="mt-4 text-lg font-medium">No birthdays found</h3>
          <p className="mt-1 text-gray-500">
            {searchTerm ? "Try adjusting your search" : "Add your first birthday reminder"}
          </p>
          {!searchTerm && (
            <Link to="/add">
              <Button className="mt-4 bg-birthday-red hover:bg-birthday-red/90">
                Add Birthday
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default BirthdayList;
