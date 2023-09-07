"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyOTP, sendOTP, changePassword } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import AuthLayout from "../../layout";
import  signupBackground from "../../../../public/photo-6.avif"
import { useSearchParams } from "next/navigation";
import { any } from "zod";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// interface VerifyUserProps {
//   searchParams: {
//     email: string;
//   };
// }

const VerifyUser = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [sentOtp,setSentOtp] = useState(false);
  const params = useSearchParams();
  const email = params.get('email')
  useEffect(()=>{

    sendOTP(email).then((data)=>{
        setSentOtp(true);
    }).catch((err)=>{
        router.push(`/auth/forgot-password?invalid=${true}`);
    });
  },[]);
  //   const { data, isError, isLoading, refetch, isRefetching } = useQuery({
  //     queryKey: ["otp"],
  //     queryFn: () => verifyOTP({ email, otp }),
  //     enabled: false,
  //     onSuccess: () => router.push("/auth/login"),
  //     onError: (err: any) => setMessage(err.response.data.message),
  //   });
  const [otp, setOtp] = useState("");
  const validationScheme = z.object({
    password: z
    .string()
    .min(8, { message: "Password must be 8 characters long" })
    .max(20, { message: "Password must be less than 20 characters" }),
});
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);
    // console.log(otp);
    // await refetch();
    try {
      const data = await verifyOTP({ email, otp });
      console.log(data);
      setIsVerified(true);
    } catch (err: any) {
      setMessage(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  const form = useForm<z.infer<typeof validationScheme>>({
    resolver: zodResolver(validationScheme),
    defaultValues: {
      password: "",
    },
  });
  const handleSubmitPassword = async (data: z.infer<typeof validationScheme>) => {
    // console.log("register data", data);
    
    const { password } = data;
    if(password.length<8){
      setMessage('Password must be 8 characters long');
      return;
    }
    //console.log(email);
    //console.log(password);
    changePassword({password},email).then(data=>{
      router.push(`/auth/login`);
    }).catch(err=>setMessage(err.response.data.message));
    
  };
  if(sentOtp){
  return (
    <AuthLayout  backgroundImage={signupBackground}>
    <Card className="w-full max-w-md md:max-w-xl md:px-6 md:py-8 text-center">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Verify OTP</CardTitle>
        <CardDescription>
          An verification email sent to{" "}
          <span className="font-medium text-orange-500">{email}</span> . Please
          verify by providing OTP
        </CardDescription>
      </CardHeader>
      <CardContent>
      {!isVerified && <form onSubmit={handleSubmit}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            placeholder="000000"
            renderSeparator={"  "}
            renderInput={(props) => <input {...props} />}
            containerStyle={"w-full flex gap-2 jusify-evenly"}
            inputStyle={
              "border text-black font-mono text-3xl rounded-lg w-full h-16 w-16 flex items-center justify-center flex-1"
            }
          />
          
          <p className="mt-4 text-red-500 empty:hidden">{message}</p>

          <Button className="mt-6" size="lg" isLoading={isLoading}>
            Verify
          </Button>
        </form>}
          {isVerified && <Form {...form}>
          <form className="" onSubmit={form.handleSubmit(handleSubmitPassword)}>
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
            <p className="mt-4 text-red-500 empty:hidden">{message}</p>

            <Button
              type="submit"
              className="w-full h-auto py-3 rounded-lg mt-6"
            >
              Submit
            </Button>
          </form>
        </Form>}

      </CardContent>
       <ToastContainer />
    </Card>
    </AuthLayout>
  );
              }
};

export default VerifyUser;
