import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import profile_image from "../../public/images/profile.png";

import { useRouter } from "next/navigation";

const YourProfile = () => {
  const router = useRouter();

  // Define state variables to store the user's first name and last name
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePic,setProfilePic] = useState("");
  
  const handleEditProfile = () => {
    router.push("/pages/ProfilePage");
  };
  useEffect(() => {
    // Fetch the userdata from local storage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const { first_name, last_name, profile } = JSON.parse(storedUserData);
      setFirstName(first_name);
      setLastName(last_name);
      setProfilePic(profile);
    }
  }, []);
  return (
    <div className="text-center">
      <div className="mb-4">
        <p className="text-xl font-bold">Your Profile</p>
      </div>

     {!profilePic && <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"    // Increase the width to make the icon larger
        height="48"   // Increase the height to make the icon larger
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-12 h-12 mb-4 mx-auto"   // Adjust the icon's size
      >
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 1 0-16 0" />
      </svg>}
      {profilePic && <img
                    src={profilePic}
                    alt="Profile"
                    className="w-20 h-20 mb-4 mx-auto rounded-full"
                  />}
      <p className="text-lg mt-2">  
        {firstName || "User's"} {lastName || "Name"}
      </p>

      <Button
        className="bg-teal-500 w-36 mt-4 mx-auto hover:bg-blue-500"
        onClick={handleEditProfile}
      >
        Edit Profile
      </Button>

    </div>
  );
};

export default YourProfile;
