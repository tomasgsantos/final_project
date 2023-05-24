import React, { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import "./profile.css"
import { updateProfile } from "../../utils/AuthService";

export default function Profile({ userData }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [profileData, setProfileData] = useState("");

  useEffect(() => {
    if (userData) {
      setProfileData(userData);
      console.log("profileData: ", profileData)
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      updateProfile(profileData)
      console.log("success")
    }catch(err){
    console.log(err)
  };
}
    


  return (
    <Box>
      <Header title={"Profile"} subtitle={"Edit your profile"} />
      {profileData ? (
        <form className="profile-form" onSubmit={handleSubmit}>
          <TextField
            className="profile-text-input"
            label="Email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
          />
          {/* <TextField
            className="profile-text-input"
          label="Password"
          name="password"
          type="password"
          value={profileData.password}
          onChange={handleInputChange}
        /> */}
          <TextField
            className="profile-text-input"
            label="Name"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
          />
          <TextField
            className="profile-text-input"
            label="Date of Birth"
            name="date_birth_mmddaaaa"
            value={formatDate(profileData.dateOfBirth)}
            onChange={handleInputChange}
          />
          <TextField
            className="profile-text-input"
            label="Height (cm)"
            name="heightincm"
            value={profileData.heightInCm}
            onChange={handleInputChange}
          />
          <TextField
            className="profile-text-input"
            label="Weight (kg)"
            name="weightinkg"
            value={profileData.weightInKg}
            onChange={handleInputChange}
          />
          <Button className="profile-save" variant="contained" color="secondary" type="submit">
            Save
          </Button>
        </form>
      ) : (
        <p>Loading ...</p>
      )}{" "}
    </Box>
  );
}
