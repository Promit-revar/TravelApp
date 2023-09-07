import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const updateObject = (oldObject: any, updatedProperties: any) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export function formatDate(dateString: any) {
  var date = new Date(dateString);

  var day = date.getDate();
  var month = date.getMonth() + 1; // Adding 1 because months are zero-based.
  var year = date.getFullYear();

  // Formatting with leading zeros if necessary.
  var formattedDay = (day < 10 ? "0" : "") + day;
  var formattedMonth = (month < 10 ? "0" : "") + month;

  var formattedDate = formattedDay + "/" + formattedMonth + "/" + year;
  return formattedDate;
}
