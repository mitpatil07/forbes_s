import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

export default function ForbesLogin({ onClose, onLoginSuccess }) {
  const handleGoogleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const userInfo = jwt_decode(token);
    console.log("Google User:", userInfo);

    fetch("http://127.0.0.1:8000/auth/google/login/callback/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ access_token: token }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend response:", data);
        localStorage.setItem("authToken", data.key);
        
        const userData = {
          id: userInfo.sub,
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
          loginTime: new Date().toISOString(),
        };
        
        sessionStorage.setItem("forbesUser", JSON.stringify(userData));
        onLoginSuccess(userData);
        onClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <GoogleOAuthProvider clientId="826092748377-uic5cm4rg96qrvk8qetvkiel1ual98ni.apps.googleusercontent.com">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 text-lg font-bold hover:text-gray-700"
            onClick={onClose}
          >
            ✕
          </button>
          <h2 className="text-2xl font-serif text-center mb-4">Sign In To Forbes</h2>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log("Login Failed")}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}