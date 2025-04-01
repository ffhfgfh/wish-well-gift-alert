
import { useState } from "react";
import { format, differenceInDays, addYears } from "date-fns";
import { Gift, Calendar, Trash2, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Birthday } from "@/types/birthday";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BirthdayCardProps {
  birthday: Birthday;
  onDelete: (id: string) => void;
}

const BirthdayCard = ({ birthday, onDelete }: BirthdayCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const birthDate = new Date(birthday.birthDate);
  const today = new Date();
  
  // Calculate next birthday
  const nextBirthday = new Date(birthDate);
  nextBirthday.setFullYear(today.getFullYear());
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  
  const daysUntilBirthday = differenceInDays(nextBirthday, today);
  const age = nextBirthday.getFullYear() - birthDate.getFullYear();
  
  const handleDelete = () => {
    onDelete(birthday.id);
    toast.success("Birthday deleted successfully");
    setIsOpen(false);
  };

  return (
    <div className="birthday-card overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-birthday-dark">{birthday.name}</h3>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{format(birthDate, "MMMM d, yyyy")}</span>
            </div>
          </div>
          
          <Badge 
            className={cn(
              daysUntilBirthday <= 7 
                ? "bg-birthday-red text-white" 
                : daysUntilBirthday <= 30 
                ? "bg-birthday-yellow text-birthday-dark" 
                : "bg-birthday-teal text-white"
            )}
          >
            {daysUntilBirthday === 0 
              ? "Today!" 
              : daysUntilBirthday === 1 
              ? "Tomorrow!" 
              : `${daysUntilBirthday} days`}
          </Badge>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center text-sm">
            <span className="font-medium mr-1">Relationship:</span>
            <span>{birthday.relationship}</span>
          </div>
          
          <div className="flex items-center text-sm mt-1">
            <span className="font-medium mr-1">Turning:</span>
            <span>{age} years old</span>
          </div>
          
          {birthday.interests && (
            <div className="mt-3">
              <span className="text-sm font-medium">Interests:</span>
              <p className="text-sm text-gray-600 mt-1">{birthday.interests}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex border-t">
        <Link 
          to={`/gifts?relationship=${birthday.relationship}&interests=${encodeURIComponent(birthday.interests || '')}`}
          className="flex-1 py-3 flex justify-center items-center text-sm font-medium text-birthday-teal hover:bg-gray-50 transition-colors"
        >
          <Gift className="w-4 h-4 mr-1" />
          Gift Ideas
        </Link>
        
        <button 
          onClick={() => toast.success(`Reminder set for ${birthday.name}'s birthday!`)}
          className="flex-1 py-3 flex justify-center items-center text-sm font-medium text-birthday-yellow hover:bg-gray-50 transition-colors border-l"
        >
          <Bell className="w-4 h-4 mr-1" />
          Set Reminder
        </button>
        
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <button className="py-3 px-4 flex justify-center items-center text-sm font-medium text-birthday-red hover:bg-gray-50 transition-colors border-l">
              <Trash2 className="w-4 h-4" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete {birthday.name}'s birthday entry.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-birthday-red hover:bg-birthday-red/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default BirthdayCard;
