import { Grid, Button, Typography } from "@mui/material";
import { createTheme } from "@mui/material";
import router from "next/router";
require("typeface-eb-garamond");
import "@fontsource/montserrat";
import { GiWindHole } from "react-icons/gi";
import { useState, useEffect } from "react";

export default function WelcomePage() {
  const [windowWidth, setWindowWidth] = useState(1440);
  useEffect(() => {
    function updateSize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  const handleEnterMainPage = () => {
    router.push("/main?page=login");
  };
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "black",
        zIndex: 20,
        width: windowWidth,
      }}
    >
      <div className="waterPrint">
        <span>By 20-</span>
        <GiWindHole />
        <span>-40 Studio</span>
      </div>
      <div className="heading">
        <div className="headingFont">Welcome To The World Of</div>
        <div className="headingFont"> MEMES !</div>
        <Button
          variant="outlined"
          style={{
            color: "white",
            borderColor: "white",
            borderRadius: 0,
            width: "35%",
            fontFamily: "Montserrat",
            fontSize: "13px",
            fontWeight: 600,
            height: "40px",
            top: "17vh",
          }}
          onClick={handleEnterMainPage}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
