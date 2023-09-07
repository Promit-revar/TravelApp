"use client";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { verifyOTP,loginUser } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import AuthLayout from "../../layout";
import signupBackground from "../../../../public/photo-6.avif"


const VerifyUser = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  //   const { data, isError, isLoading, refetch, isRefetching } = useQuery({
  //     queryKey: ["otp"],
  //     queryFn: () => verifyOTP({ email, otp }),
  //     enabled: false,
  //     onSuccess: () => router.push("/auth/login"),
  //     onError: (err: any) => setMessage(err.response.data.message),
  //   });
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);
    // console.log(otp);
    // await refetch();
    try {
      //console.log(email);
      const regUser = JSON.parse(localStorage.getItem('regData'));
      const data = await verifyOTP({ email, otp });
      const response = await loginUser({email,password: regUser.password});
      const jsonData = JSON.stringify(response.userData);
      localStorage.setItem('token',response.accessToken);
      localStorage.setItem('userData',jsonData);
      localStorage.removeItem('regData');
      router.push("/user/dashboard");
    } catch (err: any) {
      setMessage('Invalid email or otp');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMessage("");
  }, []);

  return (
    <AuthLayout backgroundImage={signupBackground}>
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
        <form onSubmit={handleSubmit}>
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
        </form>
      </CardContent>
    </Card>
    </AuthLayout>
  );
};

export default VerifyUser;
