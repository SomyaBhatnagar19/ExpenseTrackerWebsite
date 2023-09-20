//Profile
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//image
// import profileBg from './assets/profile.jpg';

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const nameChangeHandler = (e) => {
    setFullName(e.target.value);
  }
  const photoChangeHandler = (e) => {
    setProfilePhotoUrl(e.target.value);
  }
  const updateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userName = localStorage.setItem('userName', fullName);
    try {
      const idToken = localStorage.getItem("token");
      console.log("idToken:", idToken);
  
      if (!idToken) {
        console.error("ID token is missing or invalid.");
        alert("ID token is missing or invalid.");
        setIsLoading(false);
        return;
      }
  
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCA54c2FvusfrWM1tu6REcI_H-OVsXTm84", // Replace with your API key
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: idToken,
            displayName: fullName,
            photoUrl: profilePhotoUrl,
            returnSecureToken: true,
          }),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating user profile:", errorData);
        alert("Error updating user profile: " + errorData.error.message);
        setIsLoading(false);
        return;
      }
  
      const data = await response.json();
      console.log("User details updated successfully:", data);
      alert("User details updated successfully");
      setFullName("");
      setProfilePhotoUrl("");
      navigate('/UserDetails');

    } catch (error) {
      console.error("Error updating user profile:", error);
      alert("Error updating user profile: " + error.message);
    }
  
    setIsLoading(false);
    
  };
  
  
  return (
    <div className="bg-profile h-screen bg-cover bg-center relative sm:bg-contain lg:bg-cover">
      <div className="bg-stone-200 p-5 flex justify-between items-center">
        <h4 className="text-left text-lg">Expense Tracker</h4>
        <h4 className="text-right text-sm">
          Your profile is only 64% complete.
        </h4>
      </div>
      
      <div className="container mx-auto max-w-md bg-white shadow-lg rounded-lg mt-4">
        <div className="border-l-4 border-emerald-600 bg-stone-200 flex items-center justify-between p-2 shadow-md">
        <h2 className="text-lg font-semibold italic text-center">
        Contact Details
      </h2>
        </div>
        {isLoading ? ( // Conditionally render loading spinner
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500 bg-gradient-to-b from-emerald-400 via-emerald-800 to-green-500"></div>

          </div>
        ) : (
          <div className="p-2">
          <form className="grid grid-cols-2 gap-1" onSubmit={updateProfile}>
            <div className="col-span-2 mb-4">
              <label
                htmlFor="fullname"
                className="block text-md font-semibold mb-1"
              >
                Full Name:
              </label>
              <input
                type="text"
                id="fullName"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-emerald-500"
                value={fullName}
                onChange={nameChangeHandler}
              />
            </div>
            <div className="col-span-2 mb-2">
              <label
                htmlFor="photourl"
                className="block text-md font-semibold mb-1"
              >
                Profile Photo URL:
              </label>
              <input
                type="url"
                id="profilePhotoUrl"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-emerald-500"
                value={profilePhotoUrl}
                onChange={photoChangeHandler}
              />
            </div>
            <div className="col-span-2">
              <hr className="border border-emerald-500 my-4" />
            </div>
            <div className="col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-600"
              >
                Update Profile
              </button>
            </div>
          </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
