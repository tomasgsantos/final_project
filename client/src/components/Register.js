import React from 'react';
import {useNavigate} from "react-router-dom";
import '../css/Register.css';


export default function Register(){
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState(""); 
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const dbPort = 'http://localhost:5001';

  function handleRegister() {
    if(username.length === 0 || password.length === 0 || firstName.length === 0 || lastName.length === 0 || email.length === 0 || dateOfBirth.length === 0 || gender.length === 0 || address.length === 0 || phoneNumber.length === 0){
      alert("Please fill in all fields");
    }else{
      fetch(`${dbPort}/api/patient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName,
          email: email,
          dateOfBirth: dateOfBirth,
          gender: gender,
          address: address,
          phoneNumber: phoneNumber
        })
      })
    .then(res => res.json())
    navigate('/home');
  }
}
  return(
    <form className='register-form'>
      <h1>Register</h1>
       < input
       className='text-input'
       type ='text'
       placeholder='First Name'
       name = 'firstName'
       value={firstName}
       onChange = {
         (e) => setFirstName(e.target.value)
       }
       />
       < input
       className='text-input'
       type ='text'
       placeholder='Last Name'
       name = 'lastName'
       value={lastName}
       onChange = {
         (e) => setLastName(e.target.value)
       }/>
       <input
       className='text-input'
       type ='text'
       placeholder='Email'
       name = 'email'
       value={email}
       onChange = {
         (e) => setEmail(e.target.value)
       }/>
       < input
       className='text-input'
       type ='date'
       placeholder='Date of Birth'
       name = 'dateOfBirth'
       value={dateOfBirth}
       onChange = {
         (e) => setDateOfBirth(e.target.value)
       }/>
       < input
       className='text-input'
       type ='text'
       placeholder='Gender'  
       name = 'gender'
       value={gender}
       onChange = {
         (e) => setGender(e.target.value)
       }/>
       <input
       className='text-input'
       type ='text'
       placeholder='Address'
       name = 'address'
       value={address}
       onChange = {
         (e) => setAddress(e.target.value)
       }/>
       <input
       className='text-input'
       type ='text'
       placeholder='Phone Number'
       name = 'phoneNumber'
       value={phoneNumber}
       onChange = {
         (e) => setPhoneNumber(e.target.value)
       }/>
       < input
       className = "text-input"
       type = "text"
       placeholder = "Username"
       name = "username"
       value = {
         username
       }
       onChange = {
         (e) => setUsername(e.target.value)
       }
       />
       <input
       className = "text-input"
       type = "password"
       placeholder = "Password"
       name = "password"
       value = {
         password
       }
       onChange = {
         (e) => setPassword(e.target.value)
       }
       />
       <button className='register-button' onClick = {handleRegister}>Register</button>
    </form>
  )
}