import { Button, Paper, TextField, Typography } from "@mui/material";
require("typeface-eb-garamond");
import "@fontsource/montserrat";
import styles from "./LoginWindow.module.css";

export const LoginWindow = (props: {}) => {
  return (
    <div className="root">
      <Paper
        elevation={3}
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "montserrat",
          borderRadius: 15,
        }}
      >
        <div style={{ marginTop: 45, fontSize: 24, marginBottom: 10 }}>
          Sign In
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
            <span style={{ paddingRight: 31.91 }}>email: </span>
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
            <span>password:</span>
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
        <div
          style={{
            fontSize: 5,
            marginLeft: 30,
            marginRight: 30,
            marginTop: 20,
          }}
        >
          Not a user yet? Click{" "}
          <span
            style={{ fontWeight: "bold", color: "#1976d2", cursor: "pointer" }}
          >
            <a href="/signUp" target="_blank" rel="noopener noreferrer">
              sign up
            </a>
          </span>
          &nbsp;and create an account for free!
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
          Login
        </Button>
      </Paper>
    </div>
  );
};
