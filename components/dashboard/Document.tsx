"use client"
import React,{ useEffect, useState, FC } from "react";
import { getDocuments,uploadDocument, verifyDocuments } from "@/lib/action";
import Image from "next/image";
interface DocumentProps{
  tripId: string,
  userData: any
}
const DocumentComponent:FC<DocumentProps> = ({tripId, userData}) =>{
    const [document,setDocument] = useState<any>({});
    const [base64, setBase64] = useState("");
    const [file, setFile] = useState<any>(null);
    useEffect(() => {
      
      if(userData.isAdmin){
        getDocuments(tripId).then(data=>{
          setDocument(data?.document);
        }).catch(err => console.log(err));
      }
     
    }, []);
    const handleView = ()=>{
    }
    const handleSubmit = (e : any) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('file',file);
      uploadDocument(formData,tripId,userData._id).then(data=>{
        alert("File uploaded successfully");
        window.location.reload();
      }).catch(err=>console.log(err));
    }
    const handleChange = (e: any) => {
      setFile(e.target.files[0])
    }
    return (
      <div>
        {!userData.isAdmin ? (
          <>
            <h1 className="text-3xl font-semibold text-green-600">
              Upload Files
            </h1>
            <p className="text-sm font-light">
              Upload your documents here {`( .png, .jpg, .pdf )`}
            </p>{" "}
          </>
        ) : (
          ""
        )}
        <div className=" w-full py-4 h-full flex justify-between items-center flex-col sm:flex-row">
          {!userData.isAdmin ? (
            <div className=" flex bg-gray-200 justify-center items-center  w-full m:w-1/2 h-full border-2 rounded-xl border-gray-200 border-dashed min-w-[40vw] ">
              (
              <form
                className="flex items-center justify-center flex-col "
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  className="text-base py-1 m-4 px-2 rounded-lg w-10/12"
                  placeholder="Please Enter Document Name"
                  value={file?.name}
                />
                <div className="relative rounded-md shadow-sm p-4">
                  <input
                    type="file"
                    name="file"
                    id="fileInput"
                    className="sr-only"
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer relative flex justify-center items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out"
                  >
                    <span>Choose a file</span>
                  </label>
                  <span
                    id="fileName"
                    className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-600"
                  ></span>
                </div>
                <div className="flex items-center w-4/5 justify-around py-2">
                  <input
                    type="submit"
                    className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    value="Submit"
                  />
                  <input
                    type="reset"
                    className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    value="Reset"
                  />
                </div>
              </form>
              )
            </div>
          ) : (
            ""
          )}
          <ol className=" w-full m:w-1/2 h-full">
            <li className="w-full h-fit py-1 flex justify-between items-center">
              <span className="mx-2"> Uploaded Documents </span>
            </li>
            {document.title && (
              <li className="w-full rounded-lg bg-gray-200 h-fit border-b-2 border-gray-100 flex justify-between items-center">
                <span className="mx-2">{document?.title}</span>
                <button
                  type="reset"
                  className="py-1 px-3 mr-2 my-2 mx-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={handleView}
                >
                  View
                </button>
              </li>
            )}
          </ol>
        </div>
      </div>
    );
}
export default DocumentComponent;