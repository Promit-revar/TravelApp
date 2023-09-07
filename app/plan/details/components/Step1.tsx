"use client";

import { DatePicker } from "@/components/DatePicker";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { updateForm } from "@/store/formSlice";
import { DatePickerWithRange } from "@/components/DateRange";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { StateContext } from "@/context/Provider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import React, { FC, useContext, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { formatDate } from "../../../../lib/utils";

import { isBefore, isAfter, addDays } from "date-fns";

interface Step1Props {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const Step1: FC<Step1Props> = ({ setStep, step }) => {
  const form_values = useSelector((state: any) => state.form);
  console.log(form_values);
  const {
    formState: { errors, isDirty, isValid },
    handleSubmit,
    getValues,
    register,
    setValue,
  } = useForm({
    reValidateMode: "onChange",
  });

  const dispatch = useDispatch();

  const { formValues, setFormValues } = useContext(StateContext);

  const [goingDate, setGoingDate] = useState<Date | undefined>(
    formValues.going_travel_date
  );
  const [returnDate, setReturnDate] = useState<Date | undefined>(
    formValues.return_travel_date
  );

  const formattedGoingDate = formatDate(goingDate?.toDateString());
  const formattedReturnDate = formatDate(returnDate?.toDateString());

  // const [date, setDate] = React.useState<Date | undefined>(
  //   formValues.going_travel_date
  // );
  // const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
  //   from: formValues.going_travel_date,
  //   to: formValues.return_travel_date,
  // });

  useEffect(() => {
    if (isAfter(goingDate as Date, returnDate as Date)) {
      setReturnDate(goingDate);
    }
    setFormValues({
      ...formValues,
      going_travel_date: goingDate as Date,
    });
  }, [goingDate]);

  useEffect(() => {
    if (isBefore(returnDate as Date, goingDate as Date)) {
      setGoingDate(returnDate);
    }
    setFormValues({
      ...formValues,
      going_travel_date: goingDate as Date,
      return_travel_date: returnDate as Date,
    });
  }, [returnDate]);

  // useEffect(() => {
  //   if (formValues.travel_type == "One Way") {
  //     setFormValues({ ...formValues, going_travel_date: date! });
  //   } else {
  //     setFormValues({
  //       ...formValues,
  //       going_travel_date: dateRange?.from!,
  //       return_travel_date: dateRange?.to!,
  //     });
  //   }
  //   console.log(formValues);
  // }, [date, dateRange]);

  const onSubmit = (formInput: any) => {
    const updatedForm = {
      going_travel_date: formattedGoingDate,
      return_travel_date: formattedReturnDate,
    };

    dispatch(updateForm(updatedForm));
    setStep((s) => s + 1);
  };

  
  const [localVal, setLocalVal] = useState({});
  useEffect(() => {
    const jsonObj = JSON.parse(localStorage.getItem("userData"));
    setLocalVal(jsonObj);
   
  }, []);
  

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2 pb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            When are you travelling?
          </h2>
          <RadioGroup
            defaultValue={formValues.travel_type}
            className="flex items-center gap-4"
            onValueChange={(value: "One Way" | "Return") => {
              setFormValues({
                ...formValues,
                travel_type: value,
              });
              dispatch(updateForm({ travel_type: value }));
            }}
          >
            {["One Way", "Return"].map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <RadioGroupItem value={item} id={item} />
                <Label
                  className="font-medium cursor-pointer capitalize"
                  htmlFor={item}
                >
                  {item}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {formValues.travel_type == "One Way" && (
          <div className="flex flex-col gap-2">
            <DatePicker
              date={goingDate}
              setDate={setGoingDate}
              disableDate={new Date()}
            />
          </div>
        )}

        {formValues.travel_type == "Return" && (
          <div className="space-x-2">
            {/* <DatePickerWithRange
            dateRange={dateRange}
            setDateRange={setDateRange}
          /> */}
            <DatePicker date={goingDate} setDate={setGoingDate}
            disableDate={new Date()}
             />
            <span>→</span>
            <DatePicker
              date={returnDate}
              setDate={setReturnDate}
              disableDate={goingDate}
            />
          </div>
        )}
        {/* buttons */}
        <div className="space-x-4 flex justify-between pt-4">
          {/* <Link href="/"> */}
          <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
            Previous
          </Button>
          {/* </Link> */}
          <Button type="submit">Next</Button>
        </div>
      </form>
    </div>
  );
};

export default Step1;
