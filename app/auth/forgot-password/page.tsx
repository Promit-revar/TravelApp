"use client";
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
} from "@/components/ui/form";
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
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
//import { changePassword } from "@/lib/action";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import AuthLayout from "../layout";
import signupBackground from "../../../public/photo-6.avif"


const validationScheme = z.object({
  email: z.string().email({ message: "Please add a valid email" }),
});

const ChangePassword = () => {
  const params = useSearchParams();
  const invalid = params.get('invalid');
  const [message, setMessage] = useState("");
  useEffect(()=>{
    if(invalid){
      setMessage("No such user exist");
    }
  },[]);
  const router = useRouter();
  const form = useForm<z.infer<typeof validationScheme>>({
    resolver: zodResolver(validationScheme),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof validationScheme>) => {
    // console.log("register data", data);
    const { email } = data;
    router.push(`/auth/forgot-password/verify?email=${email}`);
  };
  return (
    <AuthLayout backgroundImage={signupBackground}>
    <Card className="w-full max-w-md md:max-w-xl md:px-6 md:py-8">
    <div className="flex flex-row justify-start"><ArrowLeft onClick={()=>router.push('/auth/login')} /></div>
      <CardHeader className="flex flex-col items-center text-center gap-2">
        {/* <img
          className="h-12 w-12"
          src="https://images.ixigo.com/image/upload/ixigo/6aaae6998a0dbccefca2ecd9f5a2f37b-mzybn.png"
          alt=""
        /> */}
        
          
        <CardTitle className="text-xl md:text-2xl">
          Change Password
        </CardTitle>
        
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="" onSubmit={form.handleSubmit(onSubmit)}>
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
            <p className="mt-4 text-red-500 empty:hidden">{message}</p>
            <Button
              type="submit"
              className="w-full h-auto py-3 rounded-lg mt-6"
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
    </AuthLayout>
  );
};

export default ChangePassword;