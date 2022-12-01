import {
  IconButton,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
require("typeface-eb-garamond");
import "@fontsource/montserrat";
import styles from "./LoginWindow.module.css";
import { IoCloseOutline } from "react-icons/io5";
import Router from "next/router";
import { useRef, useState } from "react";
import { GiConsoleController } from "react-icons/gi";
import { getUser } from "../pages/api/userLogin";

export const LoginWindow = (props: {
  curQuery: any;
  setCurQuery: any;
  loginSuccess: any;
  setLoginSuccess: any;
}) => {
  const { curQuery, setCurQuery } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorExist, setErrorExist] = useState(false);
  const handleLogin = async () => {
    try {
      let output = await getUser(email, password);
      Router.push("/memes");
    } catch {
      setErrorExist(true);
    }
    // Router.push("/main");
  };
  const handleEmail = (el: any) => {
    setEmail(el.target.value);
    setErrorExist(false);
  };
  const handlePassword = (el: any) => {
    setPassword(el.target.value);
    setErrorExist(false);
  };
  return (
    <div className="root">
      <Paper
        elevation={3}
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          justifyContent: "left",
          // alignItems: "center",
          fontFamily: "montserrat",
          borderRadius: 15,
        }}
      >
        <IconButton
          style={{ marginTop: 15, width: 40, marginLeft: 5 }}
          onClick={() => {
            Router.push("/");
            setCurQuery("");
          }}
        >
          <IoCloseOutline></IoCloseOutline>
        </IconButton>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ fontSize: 24, marginBottom: 10 }}>Sign In</div>
          <div style={{ alignItems: "left" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              <span style={{ paddingRight: 31.91 }}>email: </span>
              <TextField
                id="emailLogin"
                variant="outlined"
                defaultValue=""
                onChange={(el) => {}}
                style={{
                  margin: 6,
                  maxWidth: "200px",
                  //   borderColor: "black",
                }}
                size="small"
                onChangeCapture={handleEmail}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              <span>password:</span>
              <TextField
                id="passLogin"
                variant="outlined"
                defaultValue=""
                type="password"
                onChange={(el) => {}}
                style={{
                  margin: 6,
                  maxWidth: "200px",
                  //   borderColor: "black",
                }}
                size="small"
                onChangeCapture={handlePassword}
              />
            </div>
          </div>
          <div
            style={{
              fontSize: "10px",
              marginLeft: 30,
              marginRight: 30,
              marginTop: 20,
            }}
          >
            Not a user yet? Click{" "}
            <span
              style={{
                fontWeight: "bold",
                color: "#1976d2",
                cursor: "pointer",
              }}
            >
              <a href="/signUp" target="_blank" rel="noopener noreferrer">
                sign up
              </a>
            </span>
            &nbsp;and create an account for free!
          </div>
          {errorExist ? (
            <div
              style={{ fontFamily: "montserrat", color: "red", fontSize: 12 }}
            >
              Invalid email or wrong password{" "}
            </div>
          ) : (
            ""
          )}
          <Button
            variant="contained"
            style={{
              fontSize: 18,
              color: "black",
              fontWeight: "500",
              borderRadius: 0,
              borderWidth: 5,
              backgroundColor: "#fbeb4f",
              letterSpacing: 3,
              width: 125,
              height: 45,
              marginTop: 25,
              marginBottom: 25,
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      </Paper>
    </div>
  );
};
