import { createSlice } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";
import { addDays } from "date-fns";
import { updateObject } from "@/lib/utils";

const session: any = getSession();

const initialState = {
  name: "",
  email: "",
  phoneNo: "",
  from: "",
  passengers_number: 1,
  destination: {},
  travel_type: "One Way",
  going_travel_date: new Date().toString(),
  return_travel_date: addDays(new Date(), 7).toString(),
  flight_type: "Business",
  book_hotel: "Yes",
  itineraryPlan: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm: (state, action) => {
      const updatedState = action.payload;
      return updateObject(state, updatedState);
    },

    resetForm: () => {
      return initialState;
    },
  },
});

export const { updateForm, resetForm } = formSlice.actions;

export default formSlice.reducer;
