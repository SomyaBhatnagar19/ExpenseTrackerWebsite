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

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCA54c2FvusfrWM1tu6REcI_H-OVsXTm84",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: idToken,
        }),
      }
    )
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
      <div className="bg-stone-200 p-5 flex justify-between shadow-lg">
        <h4 className="text-lg italic font-semibold border-l-4 border-emerald-700 pl-4 text-emerald-700">
          Hello {userData.fullName}!! Welcome to Expense Tracker
        </h4>
        <span className="bg-emerald-500 text-white text-right text-sm p-1 rounded-xl">
          Your profile is now 100% complete.
        </span>
      </div>

      <div className="container mx-auto mt-8">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500 "></div>
          </div>
        ) : (
          <div className="shadow-md rounded-lg">
            <div className="border-l-4 border-emerald-700 bg-stone-100 shadow-md">
              <h2 className="text-xl italic ml-1 mb-1 font-semibold">
                User Details
              </h2>
            </div>
            <div className="p-3 shadow-md">
            <table className="w-full border border-gray-300 rounded-md">
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="px-4 py-3 font-semibold text-md">
                    Full Name:
                  </td>
                  <td className="px-4 py-3 text-md text-gray-800">
                    {userData.fullName}
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="px-4 py-3 font-semibold text-md">Email:</td>
                  <td className="px-4 py-3 text-md text-gray-800">
                    {userData.email}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-md">
                    Profile Photo URL:
                  </td>
                  <td className="px-4 py-3 text-md text-gray-800 break-all">
                    {userData.profilePhotoUrl}
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
