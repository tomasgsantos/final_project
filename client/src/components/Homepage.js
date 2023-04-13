import React from "react"
import "../assets/css/Homepage.css"
import Navbar from "./Navbar"
import MainContent from "./MainContent"


export default function Homepage() {
  return (
    <div className="page">
      <Navbar className="navbar" />
      <MainContent className="main-content"/>
    </div>
  )
}