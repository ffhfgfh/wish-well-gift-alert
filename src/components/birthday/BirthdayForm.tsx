
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const relationships = [
  "Family", 
  "Friend", 
  "Colleague", 
  "Partner", 
  "Spouse", 
  "Child", 
  "Other"
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  birthDate: z.date({
    required_error: "Birth date is required.",
  }),
  relationship: z.string({
    required_error: "Please select a relationship.",
  }),
  interests: z.string().optional(),
  reminderDays: z.coerce.number().int().min(0).max(60),
});

type BirthdayFormValues = z.infer<typeof formSchema>;

const BirthdayForm = () => {
  const [date, setDate] = useState<Date>();
  const navigate = useNavigate();

  const form = useForm<BirthdayFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      relationship: "",
      interests: "",
      reminderDays: 7,
    },
  });

  function onSubmit(values: BirthdayFormValues) {
    // Here we would normally save to a backend API
    // For now, we'll just save to localStorage
    const birthdays = JSON.parse(localStorage.getItem("birthdays") || "[]");
    const newBirthday = {
      id: Date.now().toString(),
      ...values,
      birthDate: values.birthDate.toISOString(),
    };
    
    birthdays.push(newBirthday);
    localStorage.setItem("birthdays", JSON.stringify(birthdays));
    
    toast.success("Birthday added successfully!");
    navigate("/birthdays");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-birthday-dark">Add New Birthday</h1>
      
      <div className="birthday-card p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter person's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Birth Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    The birth date is used to calculate upcoming birthdays.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="relationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relationship</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a relationship" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {relationships.map((relationship) => (
                        <SelectItem key={relationship} value={relationship}>
                          {relationship}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This helps us suggest appropriate gift ideas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interests & Hobbies</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="E.g., cooking, reading, sports, technology"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter interests to help with gift recommendations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reminderDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reminder Days</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      max={60}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    How many days before the birthday to send a reminder.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                className="mr-2"
                onClick={() => navigate("/birthdays")}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-birthday-red hover:bg-birthday-red/90">
                Add Birthday
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BirthdayForm;
