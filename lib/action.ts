import { FormValues } from "@/context/Provider";
import { PlanData } from "@/types/createPlanType";
import { HomeData } from "@/types/homeResultsType";
import { SearchData, SearchResultType } from "@/types/searchResultType";
import axios from "axios";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const baseUrl = "https://apiv2-quantumtravel.onrender.com/api";
// const baseUrl = "https://apiv2-quantumtravel.onrender.com/api";
//https://q-treval-frontend-tau.vercel.app/
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin':  "http://localhost:8004/api"
}
export const loginUser = async(body: any)=>{
  const url = `${baseUrl}/user/login`;
  const {data} = await axios.post(url,{...body},{headers});
  return data.data
}
export const loginMember = async(body: any) => {
  const url =`${baseUrl}/member/login`;
  const {data} = await axios.post(url,{...body},{headers});
  return data.data
}
export const registerUser = async ({
  first_name,
  last_name,
  email,
  password,
  gender, 
  dob, 
}: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  gender: string;
  dob: string;
}) => {
  const { data } = await axios.request({
    method: "post",
    maxBodyLength: Infinity,
    url: `${baseUrl}/user/create-user`,
    headers: headers,
    data: JSON.stringify({
      first_name,
      last_name,
      email,
      password,
      gender, 
      dob, 
    }),
  });

  return data.data;
};
export const updateProfilePicture = async(body: any) => {
  const url = `${baseUrl}/user/update-profile`;
  const {data} = await axios.post(url,{...body},{headers: {
    'Accept': 'application/json'
  }});
  return data.data;
}
export const changePassword = async(body: any,email: string | null) => {
  const url = `${baseUrl}/user/change-password?email=${email}`;
  const {data} = await axios.post(url,body,{headers});
  return data.data;
}
export const changePasswordLoggedIn = async(body: any,email: string | null) => {
  const url = `${baseUrl}/user/change-password-user?email=${email}`;
  const {data} = await axios.post(url,body,{headers:{
    Authorization: localStorage.getItem('token'),
    ...headers
  }});
  return data.data;
}
export const changePasswordMember = async(body: any,email: string | null) => {
  const url = `${baseUrl}/member/change-password?email=${email}`;
  const {data} = await axios.post(url,{...body},{headers:{
    Authorization: localStorage.getItem('token'),
    ...headers
  }});
  return data.data;
}
export const sendOTP = async(email:string | null) =>{
  const url = `${baseUrl}/user/change-password/send-otp?email=${email}`;
  const {data} = await axios.get(url,{headers});
  return data.data;
}
export const verifyOTP = async ({
  email,
  otp,
}: {
  email: string | null;
  otp: string;
}) => {
  const { data } = await axios.request({
    method: "get",
    url: `${baseUrl}/user/verify-user?email=${email}&OTP=${otp}`,
    headers
  });

  return data;
};
export const updateUser = async(body: any) => {
  const url = `${baseUrl}/user/update-user`
  const {data} = await axios.put(url,{...body},{headers:{
    Authorization: localStorage.getItem('token'),
    ...headers
  }});
  return data.data;
}


export const updateMember = async(body: any,memberId: string) => {
  const url = `${baseUrl}/member/update-member/${memberId}`;
  const {data} = await axios.put(url,{...body},{headers:{
    Authorization: localStorage.getItem('token'),
    ...headers
  }});
  return data.data;
}
export const searchPlace = async (query?: string) => {
  let data;
  try {
    if (query != null && query.length > 0) {
      data = await axios.get(`${baseUrl}/place/search-place?search=${query}`,{headers});
      data = data.data;
    } else {
      data = await axios.get(`${baseUrl}/place/search-place`,{headers});
      data = data.data;
    }
  } catch (errors) {
    data = data.data;
  }
  return data.data as SearchResultType;
};

export const getPlaceList = async () => {
  const { data } = await axios.get(`
  ${baseUrl}/place/get-places`,{headers});
  return data.data;
};

export const getPlaceDetails = async (place: string) => {
  const { data } = await axios.get(`${baseUrl}/place-details?search=${place}`,{headers});
  return data.data;
};

export const getHomeData = async () => {
  const { data } = await axios.get(`https://api.quantumtravel.ai/api/home-page`);
  return data.data as HomeData[];
};

export const getSinglePlaceDetails = async (id: string) => {
  const { data } = await axios.get(`${baseUrl}/place/single-place/${id}`,{headers});
};

export const createPlan = async ({
  query,
  location,
}: {
  query: string;
  location: string;
}) => {
  const { data } = await axios.post(
    `${baseUrl}/create-plan?query=${query}&location=${location}`
    ,{headers}
  );
  return data.data as PlanData;
};

// "name" : "kartik",
// "email" : "kartikkhatana1@gmail.com",
// "phoneNo" : "8882493854",
// "travel_type" : "One Way",
// "destination" : "ladakh",
// "going_travel_date" : "28/06/2023",
// "flight_type" : "Economy",
// "book_hotel" : "Yes"

export interface SubmitDetailsType {
  name: string;
  email: string;
  phoneNo: string;
  from: string;
  travel_type: "One Way" | "Return";
  destination: string;
  going_travel_date: Date;
  return_travel_date: Date;
  flight_type: "Economy" | "Business" | "First Class";
  book_hotel: "Yes" | "No";
  passengers_number: Number;
}

export const submitTripDetails = async ({
  name,
  email,
  phoneNo,
  travel_type,
  destination,
  from,
  going_travel_date,
  return_travel_date,
  flight_type,
  book_hotel,
  passengers_number,
}: SubmitDetailsType) => {
  // const going_date = format(going_travel_date, "dd/MM/yyyy");
  // const return_date = format(return_travel_date, "dd/MM/yyyy");

  const body =
    travel_type == "One Way"
      ? {
          name,
          book_hotel,
          destination,
          email,
          from,
          flight_type,
          going_travel_date: going_travel_date,
          phoneNo,
          travel_type,
          no_of_travellers: passengers_number,
        }
      : {
          book_hotel,
          destination,
          email,
          from,
          flight_type,
          going_travel_date: going_travel_date,
          return_travel_date: return_travel_date,
          name,
          phoneNo,
          travel_type,
          no_of_travellers: passengers_number,
        };

  const { data } = await axios.request({
    url: `${baseUrl}/user-trip-details/create-detail`,
    method: "post",
    maxBodyLength: Infinity,
    headers: {
      ...headers
    },

    data: JSON.stringify(body),
  });

  return data;
};

export const getIxigoSearchResults = async (query: string) => {
  const { data } = await axios.get(
    `https://www.ixigo.com/plan/api/cf/autocompleter?q=${query}`
  );
  return data as {
    displayname: string;
    loctype: string;
    lat: number;
    lng: number;
    cc: string;
    country: string;
    cityname: string;
    slug: string;
    destination_image: string;
  }[];
};

export const getWeather = async (location: string) => {
  const { data } = await axios.get(
    `https://www.ixigo.com/itinerary-planner/api/weather?location=${location}`
  );

  return data.data as {
    weather: string;
    icon: string;
    temperature: number;
    humidity: number;
    aqi: number;
    aqiValue: number;
  };
};
export const getTripDetails = async(query: string) => {
  const url = `${baseUrl}/user-trip-details/list-detail` + query;
  return await axios.get(url,{headers});

}

export const getSingleTripDetails = async(tripId: string | null) => {
  const url = `${baseUrl}/user-trip-details/single-detail/` + tripId;
  return await axios.get(url,{headers});

}


export const getNotes = async(tripId: string) => {
  const url = `${baseUrl}/user-trip-details/notes/`+tripId;
  return await axios.get(url,{headers});
}
export const addNotes = async(tripId: string, body:any) =>{
  const url = `${baseUrl}/user-trip-details/add-notes/`+tripId;
  return await axios.patch(url,body,{headers});
}
export const deleteNote =  async(tripId: string, noteId: string) =>{
  const url = `${baseUrl}/user-trip-details/notes/`+tripId+"/"+noteId;
  return await axios.delete(url,{headers});
}
export const updateNotes = async(noteId: string, body: any) =>{
  const url = `${baseUrl}/user-trip-details/notes/`+noteId;
  return await axios.put(url,body,{headers});
}
export const getUserTrips = async(email: string, query: string) => {
  const url = `${baseUrl}/user/trips/`+email+""+query;
  return await axios.get(url,{headers});
}
export const getNotifications = async(userId: string) => {
  const url = `${baseUrl}/notifications/`+userId;
  const {data} = await axios.get(url,{headers:{
    Authorization: localStorage.getItem('token'),
    ...headers
  }});
  return data.data;
}
export const readNotification = async(userId: string, notificationId: string) => {
  const url = `${baseUrl}/notifications/`+userId+"/"+notificationId;
  const {data} = await axios.get(url,{headers:{
    Authorization: localStorage.getItem('token'),
    ...headers
  }});
  return data.data;
}
export const getDocuments = async(tripId: string) =>{
  const url = `${baseUrl}/user-trip-details/user-docs/`+tripId;
  const {data} = await axios.get(url,{headers});
  return data.data;
}
export const verifyDocuments = async(docId: string, body: any) =>{
  const url = `${baseUrl}/user-trip-detials/verify-docs/`+docId;
  const {data} = await axios.post(url,{...body},{headers});
  return data.data;
}
export const uploadDocument = async(body: any, tripId: string, userId: string) => {
  const config ={
    headers:{
      'Content-Type':'multipart/form-data',
      'Accept': 'application/json'
    },
    api:{
      bodyParser: false
    }
  }
  const url =`${baseUrl}/user-trip-details/upload/`+tripId+"/"+userId;
  const {data} = await axios.post(url,{...body},config);
  return data.data;
}
export const userChats = async(tripId: string,body: any) =>{
  const url = `${baseUrl}/user/chat/${tripId}`;
  const {data} = await axios.post(url,{...body},{headers});
  return data.data;
}
export const getChats = async(tripId: string) =>{
  const url = `${baseUrl}/user-trip-details/chats/${tripId}`;
  const {data} = await axios.get(url);
  return data.data;
}
export const adminChats = async(tripId: string,body: any) =>{
  const url = `${baseUrl}/member/chats/${tripId}`;
  const {data} = await axios.post(url,{...body},{headers});
  return data.data;
}
export const getSingleUser = async(email: string) => {
  const url = `${baseUrl}/user/single-user/${email}`;
  const {data} = await axios.get(url,{headers:{
    Authorization: localStorage.getItem('token'),
    ...headers
  }});
  return data.data;
}
