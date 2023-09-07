"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { updateUser,updateMember } from "@/lib/action";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Spinner from "@/components/Spinner";

interface User {
  first_name: string;
  last_name: string;
  gender: string;
  dob: string;
  email: string;
  password: string;
  profile_picture: string;
  oldPassword: string;
}

const ProfilePage = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const initialUser: User = {
    first_name: userData?.first_name,
    last_name: userData?.last_name,
    gender: userData?.gender,
    dob: userData?.dob,
    email: userData?.email,
    password: userData?.password,
    profile_picture: userData?.profile,
    oldPassword: userData?.password
  };
  const [message, setMessage] = useState("");
  const [user, setUser] = useState<User>(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [dobVar, setDobVar] = useState(new Date(userData.dob));
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [isSecurityEditing, setIsSecurityEditing] = useState(false);
  const [initialState, setInitialState] = useState(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSave = async () => {
    
    if(user.password.length< 8){
      setMessage('Password must be 8 characters long')
      return;
    }
    if(user.first_name.length ===0 ){
      setMessage('First Name is required')
      return;
    }
    if(user.last_name.length ===0 ){
      setMessage('Last Name is required')
      return;
    }
    if(userData.isAdmin){

      updateMember({
        first_name:user.first_name,
        last_name:user.last_name, 
        gender: user.gender, 
        dob:user.dob,
        profile: user.profile_picture,
        password: user.password,
        oldPassword: user.oldPassword
      }, userData._id)
      .then(data => {
        localStorage.setItem("userData", JSON.stringify(data?.updateMember));
        setIsEditing(false);
        setInitialState({...user});
        setIsSecurityEditing(false)
        toast.success('Profile updated successfully!', {
          position: 'top-right',
          autoClose: 1000, // Time the notification is displayed (in milliseconds)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }).catch(err=>(toast.error('Unable to update profile !', {
        position: 'top-right',
        autoClose: 1000, // Time the notification is displayed (in milliseconds)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })));
    } 
    else{
      //console.log(user);
    updateUser({
      first_name: user.first_name,
      last_name: user.last_name,
      gender: user.gender,
      dob: user.dob,
      profile: user.profile_picture,
      password: user.password,
      oldPassword: user.oldPassword
    })
      .then((data) => {
        //console.log(data);
        localStorage.setItem("userData", JSON.stringify(data?.updateUser));
        setInitialState({...user});
        setIsEditing(false);
        setIsSecurityEditing(false); 
         toast.success('Profile updated successfully!', {
          position: 'top-right',
          autoClose: 1000, // Time the notification is displayed (in milliseconds)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch(err=>(
        toast.error('Unable to update profile !', {
        position: 'top-right',
        autoClose: 1000, // Time the notification is displayed (in milliseconds)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })));
    }
    //window.location.reload();
  };

        
      
     

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const file = e.target.files && e.target.files[0];
    let formData = new FormData();
    if (file) {
      formData.append('file',file);
      // console.log(file);
      // console.log("here",formData);
      fetch('https://apiv2-quantumtravel.onrender.com/api/user/update-profile',{
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then((res)=>res.json())
      .then((data)=>{
        setUser({...user,profile_picture: data.data.link});
        setIsLoading(false)
      })
      .catch(err=>{
        setIsLoading(false);
        toast.error('only jpg, png and jpeg formats are allowed!', {
          position: 'top-right',
          autoClose: 5000, // Time the notification is displayed (in milliseconds)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      });
    }
  };

  const mainPage = ()=>{
    // console.log(userData.isAdmin);
    if(userData.isAdmin){ 
      router.push('/admin/dashboard');
    }
    else{
      router.push(`/user/dashboard`);
    }
  }

  const removeProfilePicture = () => {
    setProfilePicture(null);
  };

  const fetchUserDataFromLocalStorage = () => {
    if (userData && userData.dob) {
      const dob = moment(userData.dob).format("DD/MM/YYYY");
      setUser({ ...user, dob });
      setInitialState({...initialState,dob})
    }
  };

  useEffect(() => {
    fetchUserDataFromLocalStorage();
  }, []);
  const token = localStorage.getItem('token');

 console.log(user);
  if(!token){
    router.push("/");
  }
  else{
  return (
    <div className="container mx-auto px-4 py-8 bg-grey-500">
      <div className="mx-auto bg-blue shadow p-8 rounded-lg">
      <div className="flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
           onClick={mainPage}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <h1 className="text-2xl font-semibold ml-2">Back</h1>
        </div>
        <h1 className="text-2xl font-semibold mb-4 py-2">Account</h1>
        {/* General Information Section */}
        
          
            
              {/* Profile Picture */}
              <div className="flex items-center mb-2">
                {user.profile_picture &&
                  <img
                    src={user.profile_picture}
                    alt="Profile"
                    className="w-20 h-20 rounded-full mr-2"
                  /> }
                  
                   {!user.profile_picture && <div className="w-28 h-28 rounded-full bg-gray-300 mr-2" />}
                    {isEditing && <div className="">
                      
                        
                          {/* Add Picture Button */}
                          {!isLoading && <label
                            htmlFor="uploadInput"
                            className="cursor-pointer bg-blue-500 text-white py-1 px-1 rounded"
                          >
                            Change
                          </label>}
                          {isLoading && <Spinner />}
                          <input
                            type="file"
                            accept="image/*"
                            id="uploadInput"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled = {isLoading}
                          />
                        
                      
                    </div>}
                  
                
              </div>
              {!isEditing ? (
              <>
              {/* Other information */}
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold">General</h1>
                <button
                  className="bg-blue-500 text-white py-1 px-4 rounded"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-semibold mb-1">First Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    value={user.first_name}
                    readOnly={!isEditing}
                    onChange={(e) => setUser({ ...user, first_name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Last Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    value={user.last_name}
                    readOnly={!isEditing}
                    onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                  />
                </div>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Date of Birth:</p>
                
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  value={user.dob}
                  readOnly={!isEditing}
                  onChange={(e) => setUser({ ...user, dob: e.target.value })}
                  placeholder="DD/MM/YYYY" // Add placeholder for the new date format
                />
              </div>
              <div className="mb-4">
                <p className="font-semibold">Gender:</p>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  value={user.gender}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-4">
                <p className="font-semibold">Password:</p>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  value={user.password}
                  readOnly={!isEditing}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
              </div>
            </>
          
        ) : (
          <>
            {/* General Information Edit Section */}
            <h2 className="text-2xl font-semibold mb-4">Edit</h2>
            <div className="mb-4">
              <label className="block font-semibold mb-1">First Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2"
                value={user.first_name}
                onChange={(e) => setUser({ ...user, first_name: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Last Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2"
                value={user.last_name}
                onChange={(e) => setUser({ ...user, last_name: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">Date of Birth</label>
              <DatePicker
                        onChange={(date) => {
                          //console.log(date);
                          setDobVar(date);
                          const formattedDate = moment(date, "DD/MM/YYYY").format('DD/MM/YYYY');
                          //console.log(formattedDate);
                          setUser({ ...user, dob: formattedDate})
                        }}
                        selected={dobVar? dobVar:undefined}
                        maxDate={new Date()}
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={50}
                        showMonthDropdown
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/mm/yyyy"
                        className="py-2 h-auto rounded-lg border border-gray-300 pl-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-left"
                      />
            </div>
            <div className="mb-4">
              <p className="font-semibold">Gender:</p>
              {/* Add radio buttons for gender selection */}
              <div>
                <label className="space-x-2 mb-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={user.gender === "Male"}
                    onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  />
                 <span className="mr-2">Male</span>
                </label >
                <label className="space-x-2 mb-4 ml-8">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={user.gender === "Female"}
                    onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  />
                 <span className="mr-2">Female</span>
                </label>
              </div>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Password:</p>
              <input
                type="password"
                className="w-full border border-gray-300 rounded px-4 py-2"
                minLength={8}
                maxLength={20}
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
            <p className="mt-4 text-red-500 empty:hidden">{message}</p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4 mr-4"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded mt-4"
              onClick={() => {
                setUser({...initialState});
                setDobVar(new Date(userData.dob));
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
        }
};

export default ProfilePage;
