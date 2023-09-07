import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

//image
import signupIcon from './assets/signup.png';
import ForgotPassword from "./ForgotPassword";

//files

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate(); //for navigated the loggedin user to welcome page

    const handleAuth = async () => {
      if (!email || !password) {
        setError('Email and password are required.');
        return;
      }
  
      if (!isLogin && password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
  
      const firebaseApiKey = 'AIzaSyCA54c2FvusfrWM1tu6REcI_H-OVsXTm84';
      const firebaseAuthEndpoint = isLogin
        ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`
        : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseApiKey}`;
  
      try {
        const response = await fetch(firebaseAuthEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        });
  
        const data = await response.json();
        // console.log(data);
        localStorage.setItem('token', data.idToken);
        if (!response.ok) {
          setError(data.error.message);
        } else {
          if (isLogin) {
            alert('You have successfully logged in.');
            navigate("/Welcome");
            console.log('Logging in:', email, password);
          } else {
            alert('You have successfully siggned in. Log in using using credentials to access expense tracker.');
            console.log('Signing up:', email, password);
            // localStorage.setItem('token', data.idToken); //storing the idToken to be used in the profile component for updating data here
          }
          // Reset form fields on successful login or sign-up
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setError('');
        }
      } catch (err) {
        setError('An error occurred.');
      }
    };
  
    const ForgotPasswordHandler = () => {
      navigate('/ForgotPassword');
    }

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-stone-100">
        <div className="flex items-center justify-center bg-white shadow-lg ">
        <div className="w-80 h-70 shadow-lg">
            <div className="border-l-4 border-emerald-600 bg-stone-200 flex items-center justify-between p-2 shadow-md">
            <h2 className="text-2xl font-semibold italic mb-4 ">
              {isLogin ? 'Log In' : 'Sign Up'}
            </h2>
            <img src={signupIcon} alt="sign-up-icon" className="w-10 h-10"/>
            </div>
            
            
            {error && <p className="rounded text-red-500 m-1 bg-red-200 p-1">{error}</p>}
            <div className="p-4">
            <input
              type="email"
              className="w-full p-2 rounded border mb-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full p-2 rounded border mb-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isLogin && (
              <input
                type="password"
                className="w-full p-2 rounded border mb-2"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            <button
              onClick={handleAuth}
              className="bg-emerald-700 text-white p-2 rounded w-full hover:bg-emerald-600"
            >
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
            {/* {successMessage && <p className="rounded text-green-800 m-1 bg-green-400 p-1 m-1">{successMessage}</p>} */}
            <hr className="border border-emerald-500 my-2"></hr>
            <p className="mt-2">
              {isLogin ? 'Need an account?' : 'Already have an account?'}{' '}
              <span
                className="cursor-pointer text-blue-500"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </span>
              <br/>
              <button className="mt-1 cursor-pointer hover:underline text-blue-500" onClick={ForgotPasswordHandler}>Forgot Password?</button>
            </p>
          </div>
          </div>
        </div>
        
      </div>
    );
};

export default SignUp;