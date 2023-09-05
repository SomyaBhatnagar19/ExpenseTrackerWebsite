import React, { useState, useEffect } from "react";

const UserDetails = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const idToken = localStorage.getItem("token");

    if (!idToken) {
      console.error("ID token is missing or invalid.");
      setIsLoading(false);
      return;
    }

    fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCA54c2FvusfrWM1tu6REcI_H-OVsXTm84", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idToken: idToken,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.users && data.users.length > 0) {
          const user = data.users[0];
          setUserData({
            fullName: user.displayName || "",
            email: user.email || "",
            profilePhotoUrl: user.photoUrl || "",
          });
        } else {
          console.error("User not found.");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
        <div className="bg-stone-200 p-5 text-right">
              <span className="bg-emerald-500 text-white text-sm p-1 rounded-xl">
                Your profile is now 100% complete.
              </span>          
        </div>
        <h2 className="text-2xl font-semibold m-4 text-center">User Details</h2>
      <div className="container mx-auto mt-5">
        {isLoading ? (
          <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500 "></div>
        </div>
        ) : (
            <div className="bg-emerald-50 shadow-md rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <p className="font-semibold text-lg mb-2">Full Name:</p>
                <p className="text-gray-800">{userData.fullName}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="font-semibold text-lg mb-2">Email:</p>
                <p className="text-gray-800">{userData.email}</p>
              </div>
              <div className="col-span-2">
                <p className="font-semibold text-lg mb-2">Profile Photo URL:</p>
                <p className="text-gray-800 break-all">{userData.profilePhotoUrl}</p>
              </div>
            </div>
          </div>
          

        )}
      </div>
    </div>
  );
};

export default UserDetails;
