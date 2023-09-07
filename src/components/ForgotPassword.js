import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//icon
import forgotPasswordIcon from "./assets/forgot-password.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    if (!email) {   //if user didnt enter the email show error
      setError("Please Enter a Valid Email.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCA54c2FvusfrWM1tu6REcI_H-OVsXTm84`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email,
          }),
        }
      );

      if (response.ok) {
        setSuccessMessage("Password reset link has been sent to your email.");
      } else {
        const data = await response.json();
        setError(data.error.message);
      }
    } catch (err) {
      setError("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-stone-100">
      <div className="max-w-md w-full bg-white rounded-md shadow-md">
        <div className="border-l-4 border-emerald-600 bg-stone-200 flex items-center justify-between p-2 shadow-md">
          <h2 className="text-2xl font-semibold italic ml-1">
            Forgot Password
          </h2>
          <img
            src={forgotPasswordIcon}
            alt="forgot-password-icon"
            className="w-10 h-10"
          />
        </div>

        <div className="p-4">
          <input
            type="email"
            className="w-full p-2 rounded border mb-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {loading && (
            <div className="flex justify-center my-4 space-x-2">
              <div className="w-5 h-5 bg-emerald-500 rounded-full animate-bounce"></div>
              <div className="w-5 h-5 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-5 h-5 bg-purple-500 rounded-full animate-bounce"></div>
              <div className="w-5 h-5 bg-yellow-500 rounded-full animate-bounce"></div>
            </div>
          )}
          {successMessage && (
            <div className="text-green-500 text-center italic my-4">
              {successMessage}
            </div>
          )}
          {error && (
            <div className="text-red-600 text-center italic my-4">{error}</div>
          )}
          {successMessage && (
            <p className="text-center">
              Please check your email for the password reset link.
              <br />
              <hr className="border border-emerald-500 my-2"></hr>
              After resetting your password, you can{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                login here
              </a>
              .
            </p>
          )}
          {!loading && !successMessage && (
            <button
              onClick={handlePasswordReset}
              className="bg-emerald-700 text-white p-2 rounded w-full hover:bg-emerald-600"
            >
              Reset Password
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
