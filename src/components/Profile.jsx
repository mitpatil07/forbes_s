import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetch("http://127.0.0.1:8000/auth/user/", {
        headers: { Authorization: `Token ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data));
    }
  }, []);

  return (
    <div className="p-6">
      {user ? (
        <div>
          <h2 className="text-xl">Welcome, {user.username}</h2>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
