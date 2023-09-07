"use client";
import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { SearchData } from "@/types/searchResultType";
import { addDays } from "date-fns";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "@/store/configureStore";
import persistStore from "redux-persist/lib/persistStore";

interface ProviderProps {
  children: React.ReactNode;
}

export interface FormValues {
  name: string;
  email: string;
  phoneNo: string;
  destinationId: string;
  travel_type: "Return" | "One Way";
  going_travel_date: Date;
  return_travel_date: Date;
  flight_type: "Economy" | "Business" | "First Class";
  book_hotel: "Yes" | "No";
  place: string;
  city: string;
  state: string;
  country: string;
  itineraryPlan: string;
}

interface DefaultValues {
  formValues: FormValues;
  setFormValues: Dispatch<SetStateAction<FormValues>>;
  selectedPlace: SearchData | null;
  setSelectedPlace: Dispatch<SetStateAction<SearchData | null>>;
}

export const StateContext = createContext<DefaultValues>({} as DefaultValues);

const Provider: FC<ProviderProps> = ({ children }) => {
  const queryClient = new QueryClient();
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    email: "",
    phoneNo: "",
    destinationId: "",
    travel_type: "One Way",
    going_travel_date: new Date(),
    return_travel_date: addDays(new Date(), 7),
    flight_type: "Business",
    book_hotel: "Yes",
    place: "",
    city: "",
    state: "",
    country: "",
    itineraryPlan: "",
  });

  const [selectedPlace, setSelectedPlace] = useState<null | SearchData>(null);

  // useEffect(() => {
  //   localStorage.setItem("values", JSON.stringify(formValues));
  // }, [formValues]);

  // useEffect(() => {
  //   localStorage.setItem("selected", JSON.stringify(selectedPlace));
  // }, [selectedPlace]);

  let persistor = persistStore(store);

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <StateContext.Provider
          value={{ formValues, setFormValues, selectedPlace, setSelectedPlace }}
        >
          <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {children}
            </PersistGate>
          </ReduxProvider>
        </StateContext.Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Provider;
