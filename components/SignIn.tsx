"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
import { loginUser, loginMember } from "@/lib/action";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const validationScheme = z.object({
  email: z.string().email({ message: "Please add a valid email" }),
  password: z.string()
    
});

const SignIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [member,setMember] = useState(false);

  const form = useForm<z.infer<typeof validationScheme>>({
    resolver: zodResolver(validationScheme),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onMemberSubmit = async (data: z.infer<typeof validationScheme>) => {
    try{
    const response = await loginMember(data);
    const jsonData = JSON.stringify(response.memberData)
    localStorage.setItem('token',response.accessToken);
    localStorage.setItem('userData',jsonData);
   setIsLoading(true);
   //console.log(localStorage.getItem('userData'));

   // console.log("login res", res);

   router.push("/admin/dashboard");
    }
    catch(err){
      setMessage("Invalid Credentials")
    }
 };

  const onSubmit = async (data: z.infer<typeof validationScheme>) => {
     try{const response = await loginUser(data);
     //console.log(response);
     const jsonData = JSON.stringify(response.userData);
     localStorage.setItem('token',response.accessToken);
     localStorage.setItem('userData',jsonData);
    setIsLoading(true);
    router.push("/user/dashboard");
  //  router.push("/"); // before this code 
     }
     catch(err){
      setMessage("Invalid Credentials")
     }
  };

  useEffect(() => {
    setMessage("");
  }, []);





  

  return (
    <Card className="w-full max-w-md md:max-w-xl md:px-6 md:py-8">
      <CardHeader className="flex flex-col items-center text-center gap-2">
        {/* <img
          className="h-12 w-12"
          src="https://images.ixigo.com/image/upload/ixigo/6aaae6998a0dbccefca2ecd9f5a2f37b-mzybn.png"
          alt=""
        /> */}
        <CardTitle className="text-xl md:text-2xl">{!member?"User":"Admin"} Login </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="" onSubmit={(!member)?form.handleSubmit(onSubmit):form.handleSubmit(onMemberSubmit)}>
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
            <p className="text-red-500 empty:hidden pt-2 text-center">
              {message}
            </p>
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full h-auto py-3 rounded-lg mt-6"
            >
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-sm flex flex-row justify-between align-center flex-wrap">
        <div>
        <Button
          className="text-orange-500 hover:no-underline align-center"
          onClick={()=>setMember(!member)}
        >
          {!member && "Login as admin" }
          {member && "Login as user" }
        </Button></div>
        <div>
        <span className="whitespace-pre">Don&apos;t have an account? </span>
        <Link
          className="underline text-orange-500 hover:no-underline"
          href="/auth/register"
        >
          Register
        </Link>
        <div className="ml-28">
        <Link className="underline text-orange-500 hover:no-underline"
          href="/auth/forgot-password"
        >
          Forgot password
        </Link>
        </div>
        </div>
       
      </CardFooter>
    </Card>
  );
};

export default SignIn;
