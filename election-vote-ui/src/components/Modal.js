import React, { useState } from "react";
import axios from "axios";
import { useAppContext } from "@/context";


const TestModals = () => {
    const [showModal, setShowModal] = useState(false);
    const [firstName,setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const { isAuth, setAuth, setProfileInfo, profileInfo } = useAppContext();
    

const updateFunction =  async () => {
    try {
        const response = await axios.put(`${process.env.REST_API}/Update`,{firstName,lastName,email:profileInfo.email})
        console.log(profileInfo.email);
        console.log("Response:", response.data);

    }
  catch (error) {
    console.error("Error:", error);
  }
    }


const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.5)", /* Adjust the opacity as needed */
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  };


  return (
    <div className="center font text-white">
      <div>
        <button
          type="button"
          onClick={() => setShowModal(true)}
        >
          Edit Profile
        </button>
      </div>  
      {showModal ? (
        // <div className="mt-10 flex justify-center items-center flex-col w-72 rounded-lg shadow-xl h-auto p-2">
        <div style={{...overlayStyle}} >

          <h2 className="text-base mt-2 mx-4 text-gray-400 font-semibold text-center">
            Enter Your First Name
          </h2>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
          <h2 className="text-base mt-2 mx-4 text-gray-400 font-semibold text-center">
            Enter Your Last Name
          </h2>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
          <button
            className="my-5 w-auto px-8 h-10 bg-blue-600 text-white rounded-md shadow hover:shadow-lg font-semibold"
            onClick={() => updateFunction()}
          >
            Save
          </button>
          <button
            className="my-5 w-auto px-8 h-10 bg-blue-600 text-white rounded-md shadow hover:shadow-lg font-semibold"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      ) : null}
    </div>

  );
};

export default TestModals;
