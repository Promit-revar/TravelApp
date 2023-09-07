import SignIn from "@/components/SignIn";
import Image from "next/image";
import React from "react";
import AuthLayout from "@/../../app/auth/layout";
import loginBackground from "../../../public/photo-4.avif";

const Login = () => {
  return (
    <AuthLayout backgroundImage={loginBackground}>
      <SignIn />;
    </AuthLayout>
  )
};

export default Login;
 

 