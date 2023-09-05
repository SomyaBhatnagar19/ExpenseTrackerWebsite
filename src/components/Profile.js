import React, { useState } from "react";

//image
// import profileBg from './assets/profile.jpg';

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
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
    } catch (error) {
      console.error("Error updating user profile:", error);
      alert("Error updating user profile: " + error.message);
    }
  
    setIsLoading(false);
  };
  
  
  return (
    <div className="bg-profile h-screen bg-cover bg-center relative sm:bg-contain lg:bg-cover">
      <div className="bg-stone-100 p-5">
        <h4 className="text-right text-sm">
          Your profile is only 64% complete.
        </h4>
      </div>
      <h2 className="text-2xl font-semibold m-4 text-center">
        Contact Details
      </h2>
      <div className="container mx-auto max-w-md p-4 bg-emerald-200 shadow-lg rounded-lg ">
        {isLoading ? ( // Conditionally render loading spinner
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500 bg-gradient-to-b from-emerald-400 via-emerald-800 to-green-500"></div>

          </div>
        ) : (
          <form className="grid grid-cols-2 gap-1" onSubmit={updateProfile}>
            <div className="col-span-2 mb-4">
              <label
                htmlFor="fullname"
                className="block text-lg font-semibold mb-1"
              >
                Full Name:
              </label>
              <input
                type="text"
                id="fullName"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-emerald-500"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="col-span-2 mb-4">
              <label
                htmlFor="photourl"
                className="block text-lg font-semibold mb-1"
              >
                Profile Photo URL:
              </label>
              <input
                type="url"
                id="profilePhotoUrl"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-emerald-500"
                value={profilePhotoUrl}
                onChange={(e) => setProfilePhotoUrl(e.target.value)}
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
        )}
      </div>
    </div>
  );
};

export default Profile;
