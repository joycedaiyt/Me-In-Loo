import { Grid, Button, Typography } from "@mui/material";
import { createTheme } from "@mui/material";
import router from "next/router";
require("typeface-eb-garamond");
import "@fontsource/montserrat";
import { GiWindHole } from "react-icons/gi";
import { useState, useEffect } from "react";
import { LoginWindow } from "../components/LoginWindow";

export default function WelcomePage() {
  const [windowWidth, setWindowWidth] = useState(1440);
  const [curQuery, setCurQuery] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  useEffect(() => {
    function updateSize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  const handleEnterMainPage = () => {
    router.push("?page=login");
    setCurQuery("login");
  };
  return (
    <div>
      <div
        style={{
          height: "100vh",
          backgroundColor: "black",
          zIndex: 20,
          width: windowWidth,
        }}
        id="back"
      >
        <div className="waterPrint">
          <span>By 20-</span>
          <GiWindHole />
          <span>-40 Studio</span>
        </div>
        <div className="heading">
          <div className="headingFont">Welcome To The World</div>
          <div className="headingFont"> Of MEMES !</div>
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
      <div
        style={{
          zIndex: 99999,
          position: "fixed",
          backgroundColor: "white",
          top: "30%",
          left: "37.5%",
          width: "25%",
          minWidth: "360px",
          borderRadius: 30,
        }}
      >
        {curQuery == "login" ? (
          <LoginWindow
            curQuery={curQuery}
            setCurQuery={setCurQuery}
            loginSuccess={loginSuccess}
            setLoginSuccess={setLoginSuccess}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
