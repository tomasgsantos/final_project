export const login = async (username, password) => {
  const response = await fetch("http://localhost:5001/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  if (response.ok) {
    const data = await response.json();
    console.log("authService data:", data);
    console.log("authService data.token:", data.token);
    localStorage.setItem("token", data.token);
  } else {
    throw new Error("Invalid credentials");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getUserData = async () => {
  const token = localStorage.getItem("token");
  console.log("Token ",token);
  const response = await fetch("http://localhost:5001/api/userData", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    console.log("AuthService getUserData data:", data);
    return data;
  } else {
    throw new Error("Failed to fetch user data");
  }
};
