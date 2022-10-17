import { Paper, Button, TextField } from "@mui/material";
import styles from "./SignUpWindow.module.css";
require("typeface-eb-garamond");
import "@fontsource/montserrat";
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
  return (
    <div className="root" style={{ paddingTop: "6%", marginLeft: "26%" }}>
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
                onChange={(el) => {}}
                style={{
                  margin: 6,
                  maxWidth: "200px",
                  //   borderColor: "black",
                }}
                size="small"
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
              <span style={{ paddingRight: 69 }}>password:</span>
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
                onChange={(el) => {}}
                style={{
                  margin: 6,
                  maxWidth: "200px",
                  //   borderColor: "black",
                }}
                size="small"
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
            </div>
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
          >
            Submit
          </Button>
        </div>
      </Paper>
    </div>
  );
};
