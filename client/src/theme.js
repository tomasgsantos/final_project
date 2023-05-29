import { createContext, useState, useMemo } from "react";
import {createTheme} from "@mui/material/styles";

//color design tokens
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#d7d5db",
          200: "#afabb7",
          300: "#888293",
          400: "#60586f",
          500: "#382e4b",
          600: "#2d253c",
          700: "#221c2d",
          800: "#16121e",
          900: "#0b090f",
        },
        green: {
          100: "#eef8f1",
          200: "#ddf1e3",
          300: "#cbe9d4",
          400: "#bae2c6",
          500: "#a9dbb8",
          600: "#19b247",
          700: "#65836e",
          800: "#44584a",
          900: "#222c25",
        },
        blue: {
          100: "#ccecfe",
          200: "#9ad9fe",
          300: "#67c6fd",
          400: "#35b3fd",
          500: "#02a0fc",
          600: "#0280ca",
          700: "#016097",
          800: "#014065",
          900: "#002032",
        },
        red: {
          100: "#ffd8d4",
          200: "#ffb0a9",
          300: "#ff897f",
          400: "#ff6154",
          500: "#ff3a29",
          600: "#cc2e21",
          700: "#992319",
          800: "#661710",
          900: "#330c08",
        },
        yellow: {
          100: "#fff0cc",
          200: "#ffe099",
          300: "#ffd166",
          400: "#ffc133",
          500: "#ffb200",
          600: "#cc8e00",
          700: "#996b00",
          800: "#664700",
          900: "#332400",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#0b090f",
          200: "#16121e",
          300: "#221c2d",
          400: "#2d253c",
          500: "#382e4b",
          600: "#afabb7",
          700: "#888293",
          800: "#afabb7",
          900: "#d7d5db",
        },
        green: {
          100: "#0a240c",
          200: "#154817",
          300: "#1f6d23",
          400: "#2a912e",
          500: "#34b53a",
          600: "#5dc461",
          700: "#85d389",
          800: "#aee1b0",
          900: "#d6f0d8",
        },
        blue: {
          100: "#002032",
          200: "#014065",
          300: "#016097",
          400: "#0280ca",
          500: "#02a0fc",
          600: "#35b3fd",
          700: "#67c6fd",
          800: "#9ad9fe",
          900: "#ccecfe",
        },
        red: {
          100: "#330c08",
          200: "#661710",
          300: "#992319",
          400: "#cc2e21",
          500: "#ff3a29",
          600: "#ff6154",
          700: "#ff897f",
          800: "#ffb0a9",
          900: "#ffd8d4",
        },
        yellow: {
          100: "#332400",
          200: "#664700",
          300: "#996b00",
          400: "#cc8e00",
          500: "#ffb200",
          600: "#ffc133",
          700: "#ffd166",
          800: "#ffe099",
          900: "#fff0cc",
        },
      }),
});

//mui theme settings

export const themeSettings = (mode) =>{
  const colors = tokens(mode)

  return{
    palette: {
      mode: mode,
      ...(mode==='dark' 
      ?{
        primary: {
          main:colors.primary[500],
        },
        secondary:{
          main:colors.primary[100],
        },
        neutral:{
          dark:colors.grey[700],
          main:colors.grey[500],
          light:colors.grey[100],
        },
        background:{
          default:colors.primary[500],
        }
      }:{
        primary: {
          main:colors.primary[500],
        },
        secondary:{
          main:colors.primary[300],
        },
        neutral:{
          dark:colors.grey[700],
          main:colors.grey[500],
          light:colors.grey[100]
        },
        white:{
          main: colors.grey[100]
        },
        black:{
          main:colors.grey[900]
        },
        background:{
          default:"#fcfcfc",
        },
        typography:{
          fontFamily:["Source Sans Pro", "sans-serif"].join(","),
          fontSize:12,
          h1:{
            fontFamily:["Source Sans Pro", "sans-serif"].join(","),
            fontSize:40,
          },
          h2:{
            fontFamily:["Source Sans Pro", "sans-serif"].join(","),
            fontSize:32,
          },
          h3:{
            fontFamily:["Source Sans Pro", "sans-serif"].join(","),
            fontSize:24,
          },
          h4:{
            fontFamily:["Source Sans Pro", "sans-serif"].join(","),
            fontSize:20,
          },
          h5:{
            fontFamily:["Source Sans Pro", "sans-serif"].join(","),
            fontSize:16,
          },
          h6:{
            fontFamily:["Source Sans Pro", "sans-serif"].join(","),
            fontSize:12,
          }
        }
      }
      )
    }
  }
}

//context color-mode

export const ColorModeContext = createContext({
  toggleColorMode:()=>{}
});

export const useMode = () =>{
  const [mode, setMode]= useState("dark");

  const colorMode = useMemo(
    ()=>({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light"))
    }),
    []
    );
    
    const theme = useMemo(()=> createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];
  }


  