//UserDetails
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux";
import { useDispatch } from "react-redux";
import { setVerificationStatus } from "../store/Auth";
import { toggleTheme } from "../store/theme";
//icons
import verifiedIcon from "./assets/verified.png";
import logoutIcon from "./assets/logout.png";
import darkIcon from "./assets/dark.png";
import lightIcon from "./assets/light.png";
//files
import ExpenseForm from "./ExpenseForm";


const UserDetails = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const [verificationStatus, setVerificationStatus] = useState(null);
  const [addingExpense, setAddingExpense] = useState(false); // New state for tracking if the user wants to add expensesconst [addingExpense, setAddingExpense] = useState(false); // New state for tracking if the user wants to add expenses
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const verificationStatus = useSelector((state) => state.verification.status);
  
  
  const darkMode = useSelector((state) => state.theme.darkMode);

   const themeModeHandler = () => {
    dispatch(toggleTheme());
  };

  const [verificationMessage, setVerificationMessage] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  // const darkMode = useSelector((state) => state.theme.darkMode);

    const sendEmailVerification = () => {
    setShowSpinner(true); // Show the spinner
    setVerificationMessage(
      'A verification email has been sent to your registered email address. Please check your email for the verification link. Thank you.'
    );

    // Send email verification request to Firebase
    const idToken = localStorage.getItem('token');
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCA54c2FvusfrWM1tu6REcI_H-OVsXTm84', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken,
        requestType: 'VERIFY_EMAIL',
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        console.log('Verification email sent successfully');
        dispatch(setVerificationStatus('pending')); // Set status back to pending
        setTimeout(() => {
          // Check email verification status after a delay
          checkEmailVerificationStatus();
        }, 1000);
      })
      .catch((error) => {
        console.error('Error sending verification email:', error);
        setShowSpinner(false); // Hide the spinner
        setVerificationMessage('Error sending verification email. Please try again later.');
      });
  };

  const checkEmailVerificationStatus = () => {
    // Verify the email verification status using Firebase
    const idToken = localStorage.getItem('token');

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCA54c2FvusfrWM1tu6REcI_H-OVsXTm84', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: idToken,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const user = data.users[0];
        if (user.emailVerified) {
          dispatch(setVerificationStatus('verified')); // Set status to verified
          setTimeout(() => {
            navigate('/UserDetails'); // Navigate after verification
          }, 2000); // Wait for 2 seconds before navigating
        } else {
          dispatch(setVerificationStatus('not-verified')); // Set status to not-verified
        }
      })
      .catch((error) => {
        console.error('Error checking email verification:', error);
        dispatch(setVerificationStatus('error')); // Set status to error
      });
  };

  useEffect(() => {
    // Check email verification status on component mount
    checkEmailVerificationStatus();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    alert("User logged out sucessfully.");
    navigate("/SignUp");
  };

  const navigateToExpenseForm = () => {
    navigate('/ExpenseForm');
  }

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

          if (user.emailVerified) {
            // Email is verified, show verification status
            setVerificationStatus("VERIFIED");
            alert("Your Email has been successfully Verified.");
          } else {
            // Email is not verified, show verification button
            setVerificationStatus(null);
          }
        } else {
          console.error("User not found.");
          setVerificationStatus(null);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setIsLoading(false);
        setVerificationStatus(null);
      });
  }, []);

  return (
    <div className={`bg-userDetail h-screen ${darkMode ? 'bg-gray-900' : 'bg-cover bg-center'} relative sm:bg-contain lg:bg-cover`}>
      <div className="bg-stone-200 p-5 sm:flex sm:justify-between shadow-lg">
        <h4 className="text-lg italic font-semibold border-l-4 border-emerald-700 pl-4 text-emerald-700">
          Hello {userData.fullName}!! Welcome to Expense Tracker.
        </h4>
        <div className="flex items-center justify-end space-x-2">
          <span className="bg-emerald-500 text-white text-right text-sm p-1 rounded-xl">
            Your profile is now 100% complete.
          </span>
          <button onClick={logoutHandler}>
            <img src={logoutIcon} alt="logout-icon" className="w-10 h-10" />
          </button>
        </div>
      </div>
    {/* logic for theme */}
    <div className="absolute top-24 right-4 flex items-center">
        <button
          onClick={themeModeHandler}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          {darkMode ? (
            <img src={darkIcon} alt="Dark Mode Icon" className="w-5 h-5" />
          ) : (
            <img src={lightIcon} alt="Light Mode Icon" className="w-5 h-5" />
          )}
          <span className="ml-2">{darkMode ? "Dark Mode" : "Light Mode"}</span>
        </button>
      </div>

      <div className="container mx-auto mt-8">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-500 "></div>
          </div>
        ) : (
          <div className="shadow-md ">
            <div className="border-l-4 border-emerald-700 bg-stone-100 shadow-md">
              <h2 className="text-xl italic ml-1 mb-1 font-semibold">
                User Details
              </h2>
            </div>
            <div className="p-3 shadow-md bg-neutral-50">
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

              <hr className="mt-2 mb-1 border border-emerald-500"></hr>
              <div className="flex flex-col sm:flex-row justify-between mr-3 ml-3">
                <span className="text-left mb-2 sm:mb-0">
                  Email Verification Status:
                </span>
                {verificationStatus === 'verified'  ? (
                  <div className="flex items-center">
                    <span className="text-right text-emerald-700 italic pr-2">
                      {verificationStatus}
                    </span>
                    <img
                      src={verifiedIcon}
                      alt="verification-icon"
                      className="w-10 h-10"
                    />
                  </div>
                ) : (
                  <button
                    className="text-right bg-teal-800 text-white p-2 rounded hover:bg-teal-600"
                    onClick={sendEmailVerification}
                  >
                    Click to Verify Email
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Conditional rendering of the ExpenseForm component */}
        {addingExpense ? (
          <ExpenseForm onExpenseSubmit={() => setAddingExpense(false)} />
        ) : (
          <div className="border shadow-md">
            <div className="border-l-4 border-emerald-700 bg-stone-100 shadow-md">
              <h2 className="text-xl italic ml-1 mb-1 font-semibold">
                Your Expenses
              </h2>
            </div>
            <div className="bg-white p-2">
              {/* Button to navigate to ExpenseForm */}
              <button
                className="bg-emerald-700 text-white p-2 rounded hover:bg-emerald-600"
                onClick={navigateToExpenseForm}
              >
                Add New Expense
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
