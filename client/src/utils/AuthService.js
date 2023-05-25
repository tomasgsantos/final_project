const dbPort = "http://localhost:5001";

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
    localStorage.setItem("token", data.token);
  } else {
    throw new Error("Invalid credentials");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const register = async (
  email,
  password,
  name,
  dateOfBirth,
  copdSeverity,
  heightInCm,
  weightInKg
) => {
  
  const crypto = require("crypto");

  // Generate a random salt value
  const generateSalt = () => {
    return crypto.randomBytes(16).toString("hex");
  };

  // Example usage
  const salt = generateSalt();
  if (
    email.length === 0 ||
    password.length === 0 ||
    name.length === 0 ||
    dateOfBirth.length === 0 ||
    copdSeverity.length === 0 ||
    heightInCm.length === 0 ||
    weightInKg.length === 0
  ) {
    alert("Please fill in all fields");
  } else {
     await fetch(`${dbPort}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        salt: salt,
        name: name,
        dateOfBirth: dateOfBirth,
        copdSeverity: copdSeverity,
        heightInCm: heightInCm,
        weightInKg: weightInKg,
      }),
    });
  }
};

export const updateProfile = async (profileData) => {
    const token = localStorage.getItem("token")
  // Send the updated profile data to the database
      const response = await fetch("http://localhost:5001/api/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        // Profile data successfully updated
        console.log("Profile data updated successfully");
      } else {
        // Handle error case
        console.error("Failed to update profile data");
      }
}

export const isAuthenticated = () => {
  // Check if the user is authenticated
  const token = localStorage.getItem("token");
  return !!token; // Return true if token exists, false otherwise
};
