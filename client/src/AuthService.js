export const login = async (email, password) => {
  const response = await fetch("http://localhost:5001/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
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
