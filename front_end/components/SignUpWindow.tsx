import { Paper, Button, TextField } from "@mui/material";
import styles from "./SignUpWindow.module.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { createUser } from "../pages/api/userLogin";
require("typeface-eb-garamond");
import "@fontsource/montserrat";
import { useState } from "react";
import Router from "next/router";
const axios = require("axios");
export const SignUpWindow = () => {
  const options = {
    method: "POST",
    url: "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "3d84226ea2msh0978a5fdc81eb68p1171abjsn4176d0d15749",
      "X-RapidAPI-Host": "rapidprod-sendgrid-v1.p.rapidapi.com",
    },
    data: '{"personalizations":[{"to":[{"email":"yiransun068@gmail.com"}],"subject":"Confirmation Email for MeInLoo"}],"from":{"email":"from_address@example.com"},"content":[{"type":"text/plain","value":"here is the confirmation 222222"}]}',
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errorExist, setErrorExist] = useState(false);
  const handleEmail = (el: any) => {
    setEmail(el.target.value);
    setErrorExist(false);
  };
  const handlePassword = (el: any) => {
    setPassword(el.target.value);
    setErrorExist(false);
  };
  const handleConfirm = (el: any) => {
    setConfirmPass(el.target.value);
    setErrorExist(false);
  };
  const handleSignUp = async () => {
    try {
      let output = await createUser(email, password);
      Router.replace("/");
    } catch (e) {
      setErrorExist(true);
    }
  };
  return (
    <div className="root" style={{ paddingTop: "10%", marginLeft: "35%" }}>
      <Paper
        className="paper"
        elevation={3}
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          justifyContent: "left",
          fontFamily: "montserrat",
          borderRadius: 15,
          minHeight: 500,
          maxWidth: 500,
          zIndex: 10000,
          overflow: "scroll",
        }}
      >
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {" "}
          <div style={{ fontSize: 24, marginBottom: 16, marginTop: 50 }}>
            Sign Up
          </div>
          <div style={{ alignItems: "left" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              <span style={{ paddingRight: 99.91 }}>email: </span>
              <TextField
                variant="outlined"
                defaultValue=""
                onChange={handleEmail}
                style={{
                  margin: 6,
                  maxWidth: "200px",
                  //   borderColor: "black",
                }}
                size="small"
                autoComplete="off"
              />
              {email != "" ? (
                ""
              ) : (
                <span style={{ position: "fixed", marginLeft: 375 }}>
                  <IoIosCloseCircleOutline style={{ color: "red" }} size={20} />
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              <span style={{ paddingRight: 69 }}>password:</span>
              <TextField
                variant="outlined"
                defaultValue=""
                type="password"
                onChange={handlePassword}
                style={{
                  margin: 6,
                  maxWidth: "200px",
                  //   borderColor: "black",
                }}
                size="small"
                autoComplete="off"
              />
              {confirmPass == password && password != "" ? (
                ""
              ) : (
                <span style={{ position: "fixed", marginLeft: 375 }}>
                  <IoIosCloseCircleOutline style={{ color: "red" }} size={20} />
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              <span>Confirm Password:</span>
              <TextField
                variant="outlined"
                defaultValue=""
                type="password"
                onChange={handleConfirm}
                style={{
                  margin: 6,
                  maxWidth: "200px",
                  //   borderColor: "black",
                }}
                size="small"
                autoComplete="off"
              />
              {confirmPass == password && confirmPass != "" ? (
                ""
              ) : (
                <span style={{ position: "fixed", marginLeft: 375 }}>
                  <IoIosCloseCircleOutline style={{ color: "red" }} size={20} />
                </span>
              )}
            </div>
            {/* <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              {" "}
              <span>Confirmation Code</span>
              <TextField
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
              />
            </div> */}
            {errorExist ? (
              <div
                style={{ fontFamily: "montserrat", color: "red", fontSize: 12 }}
              >
                Sorry, User already Exist
              </div>
            ) : (
              ""
            )}
          </div>
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
            disabled={
              password != confirmPass ||
              email == "" ||
              password == "" ||
              confirmPass == ""
            }
            onClick={handleSignUp}
          >
            Submit
          </Button>
        </div>
      </Paper>
    </div>
  );
};
