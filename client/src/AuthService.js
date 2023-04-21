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
    localStorage.setItem("token", data.token);
  } else {
    throw new Error("Invalid credentials");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  return token !== null;
};
