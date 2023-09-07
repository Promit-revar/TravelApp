"use client";
// @ts-ignore
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { registerUser } from "@/lib/action";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { createUser } from "../store/authSlice";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const validationScheme = z.object({
  first_name: z.string().min(4),
  last_name: z.string().min(2),
  gender: z.string(),
  dob: z.date(),
  email: z.string().email({ message: "Please add a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be 8 characters long" })
    .max(20, { message: "Password must be less than 20 characters" }),
});
const validationSchemeRegisterUserApi = z.object({
  first_name: z.string().min(4),
  last_name: z.string().min(2),
  gender: z.string(),
  dob: z.string(),
  email: z.string().email({ message: "Please add a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be 8 characters long" })
    .max(20, { message: "Password must be less than 20 characters" }),
});
const SignUp = () => {
  const user = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const { mutate: register, isLoading } = useMutation({
    mutationKey: ["register"],
    mutationFn: ({
      email,
      first_name,
      last_name,
      gender,
      dob,
      password,
    }: z.infer<typeof validationSchemeRegisterUserApi>) =>
      registerUser({ email, first_name, last_name, gender, dob, password }),
    onSuccess: (data, variable) => {
      // dispatch register
      //console.log(data);
      localStorage.setItem('regData',JSON.stringify(data.newUser));
      router.push(`/auth/register/verify?email=${variable.email}`);
      //dispatch(createUser(data));
    },

    onError: (error: any) => setMessage(error.response.data.message),
  });
  const router = useRouter();
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  const form = useForm<z.infer<typeof validationScheme>>({
    resolver: zodResolver(validationScheme),
    defaultValues: {
      first_name: "",
      last_name: "",
      gender: "",
      email: "",
      dob: undefined,
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof validationScheme>) => {
    const { email, first_name, last_name, gender, dob, password } = data;

    // const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    
    // if (!datePattern.test(dob) || !moment(dob, "DD/MM/YYYY", true).isValid()) {
    //   setMessage("dob should be in format DD/MM/YYYY");
    //   return;
    // }

    // if (gender !== "Male" && gender !== "Female") {
    //   setMessage('gender must have values either "Male" or "Female"');
    //   return;
    // }

    const formattedDOB = moment(dob, "DD/MM/YYYY").format("DD/MM/YYYY");
    //console.log(formattedDOB)
    register({
      email,
      first_name,
      last_name,
      gender,
      dob: formattedDOB,
      password,
    });
  };

  return (
    <Card className="w-full max-w-md md:max-w-xl md:px-6 md:py-8">
      <CardHeader className="flex flex-col items-center text-center gap-2">
        <CardTitle className="text-xl md:text-2xl">
          Register as a new user
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="space-y-0 mb-4">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      type="text"
                      className="py-3 h-auto rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="pt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="space-y-0 mb-4">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      type="text"
                      className="py-3 h-auto rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="pt-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-0 mb-4">
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <div>
                      <label className=" space-x-2 mb-2">
                        <input
                          type="radio"
                          value="Male"
                          {...field}
                          checked={field.value === "Male"}
                          onChange={() => field.onChange("Male")}
                        />
                        <span>Male</span>
                      </label>
                      {/* Add margin-bottom to create space between radio buttons */}
                      <label className=" space-x-2 mb-4 ml-8">
                        <input
                          type="radio"
                          value="Female"
                          {...field}
                          checked={field.value === "Female"}
                          onChange={() => field.onChange("Female")}
                        />
                        <span className="mr-4">Female</span>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage className="pt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="space-y-0 mb-4 w-full">
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <div style={{width: "100%"}} className="mb-2 w-full">
                      <DatePicker
                        selected={field.value ? new Date(field.value) : null}
                        onChange={(date) => {
                          //console.log("New date:", date);
                          //console.log(date.toLocaleDateString("en-GB"));
                          form.setValue("dob", date ? date : new Date());
                        }}
                        maxDate={new Date()}
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={50}
                        showMonthDropdown
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select your date "
                        className="py-2 h-auto rounded-lg border border-gray-300 pl-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
                      />
                    </div>
{/* data DatePicker change */}

                  </FormControl>
                  <FormMessage className="pt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-0 mb-4">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
                      type="email"
                      className="py-3 h-auto rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="pt-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-0 mb-4">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="password"
                      type="password"
                      className="py-3 h-auto rounded-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="pt-1" />
                </FormItem>
              )}
            />
            <p className="empty:hidden text-red-500 mt-2 text-center">
              {message}
            </p>
            <Button
              type="submit"
              className="w-full h-auto py-3 rounded-lg mt-6"
              isLoading={isLoading}
            >
              Register
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-sm">
        <span className="whitespace-pre">Already have an account? </span>
        <Link
          className="underline text-orange-500 hover:no-underline"
          href="/auth/login"
        >
          Login
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
