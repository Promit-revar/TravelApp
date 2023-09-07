import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { StateContext } from "@/context/Provider";
import { SubmitDetailsType, submitTripDetails } from "@/lib/action";
import { decodeURLString } from "@/lib/decodeURLString";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { FC, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { z } from "zod";
import { useSelector, useDispatch } from "react-redux";
import { updateForm, resetForm } from "@/store/formSlice";

const validationSchema = z.object({
  name: z.string().min(4),
  email: z.string().email(),
  phone: z.string(),
});

interface Step3Props {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  destination: any;
}

const Step3: FC<Step3Props> = ({ setStep, step, destination }) => {
  const form_values = useSelector((state: any) => state.form);

  const { formValues, setFormValues } = useContext(StateContext);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const [localVal, setLocalVal] = useState({});
  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: ["submit details"],
    mutationFn: (values: SubmitDetailsType) => submitTripDetails(values),
    onMutate: () => {
      setErrorMessage("");
    },
    onSuccess: (data) => {
      setStep((s) => s + 1);
    },
    onError: (error: any) => {
      setErrorMessage(error.response.data.message || error.message);
      console.log(error);
    },
  });

  const onSubmit = (values: z.infer<typeof validationSchema>) => {
    const { email, name, phone } = values;

    const updatedValues = {
      name: name,
      email: email,
      phone: phone,
    };

    const phoneNo = `+${phone}`;

    setFormValues((prev) => ({ ...prev, name, email, phoneNo }));

    dispatch(updateForm(updatedValues));

    const {
      book_hotel,
      going_travel_date,
      return_travel_date,
      flight_type,
      travel_type,
      from,
      passengers_number,
    } = form_values;

    mutate({
      book_hotel,
      from,
      destination: decodeURLString(destination),
      email,
      flight_type,
      going_travel_date,
      name,
      phoneNo,
      return_travel_date,
      travel_type,
      passengers_number,
    });

    dispatch(resetForm());
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Please provide details</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    // defaultValue={(localVal?.first_name, localVal?.last_name)}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@email.com"
                    // defaultValue={localVal?.email}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <PhoneInput
                    country={"in"}
                    autocompleteSearch
                    enableSearch
                    containerStyle={{ width: "100%" }}
                    inputStyle={{
                      width: "100%",
                      paddingBottom: "1rem",
                      paddingTop: "1rem",
                    }}
                    {...field}
                    // defaultValue={localVal?.phone}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
          <div className="flex justify-between pt-4">
            <Button
              variant="ghost"
              type="button"
              onClick={() => setStep((s) => s - 1)}
            >
              Previous
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Step3;
