import SignUp from "@/components/SignUp";
import React from "react";
import AuthLayout from "@/components/../app/auth/layout";
import signupBackground from "../../../public/photo-5.avif"; // Replace with the path to your desired background image for sign-up


const Register = () => {
  return(
    <AuthLayout backgroundImage={signupBackground}>
<SignUp />;
    </AuthLayout>

  )
};

export default Register;
