
import { addYears, differenceInDays } from "date-fns";

export const getNextBirthday = (birthDate: Date): Date => {
  const today = new Date();
  const birthDateThisYear = new Date(birthDate);
  
  birthDateThisYear.setFullYear(today.getFullYear());
  
  if (birthDateThisYear < today) {
    birthDateThisYear.setFullYear(today.getFullYear() + 1);
  }
  
  return birthDateThisYear;
};

export const getDaysUntilBirthday = (birthDate: Date): number => {
  const today = new Date();
  const nextBirthday = getNextBirthday(birthDate);
  
  return differenceInDays(nextBirthday, today);
};

export const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  const nextBirthday = getNextBirthday(birthDate);
  
  return nextBirthday.getFullYear() - birthDate.getFullYear();
};
