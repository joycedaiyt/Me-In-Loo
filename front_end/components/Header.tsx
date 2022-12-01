import { Button, Paper } from "@mui/material";
import styles from "./headBar.module.css";
import { GiWindHole } from "react-icons/gi";
import logo from "../public/logo.jpg";
import Router from "next/router";
require("typeface-eb-garamond");

export default function HeadBar() {
  const handleHover = (el: any) => {
    el.target.style.borderBottomStyle = "solid";
    el.target.style.borderBottomColor = "rgb(251, 235, 79)";
    el.target.style.borderBottomWidth = "0.4rem";
  };
  const handleLeave = (el: any) => {
    el.target.style.borderBottomStyle = "";
    el.target.style.borderBottomColor = "";
    el.target.style.borderBottomWidth = "";
  };
  const handleClick = (route: string) => {
    Router.push(`/${route}`);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 100,
        // whiteSpace: "nowrap",
        backgroundColor: "white",
        top: "-0.1px",
        position: "sticky",
      }}
    >
      <Paper
        style={{
          height: 80,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className={styles.container}>
          <div
            style={{
              fontSize: "1.6rem",
              fontWeight: 500,
              fontFamily: "EB Garamond",
              // maxWidth: 20,
            }}
          >
            {/* <img src={logo.src} width="150" height="65"></img> */}
            <span>ME-IN-LOO</span>
            {/* <GiWindHole /> */}
          </div>
          <span
            onMouseOver={handleHover}
            onMouseLeave={handleLeave}
            style={{ maxHeight: "17.5px" }}
            onClick={() => handleClick("memes")}
          >
            Memes
          </span>
          <span
            onMouseOver={handleHover}
            onMouseLeave={handleLeave}
            style={{ maxHeight: "17.5px" }}
            onClick={() => handleClick("ranking")}
          >
            Ranking
          </span>
          <span
            onMouseOver={handleHover}
            onMouseLeave={handleLeave}
            style={{ maxHeight: "17.5px" }}
            onClick={() => handleClick("account_info")}
          >
            {" "}
            Account Info
          </span>
          {/* <span
          onMouseOver={handleHover}
          onMouseLeave={handleLeave}
          style={{ maxHeight: "17.5px" }}
        >
          Projects
        </span> */}
        </div>
        <Button
          variant="outlined"
          style={{
            color: "black",
            borderColor: "#80774f",
            borderWidth: "2px",
            borderRadius: 0,
            fontFamily: "serrat",
            fontSize: "13px",
            fontWeight: 600,
            height: "40px",
            marginTop: "10px",
            width: "10%",
            textTransform: "none",
            marginRight: 60,
            whiteSpace: "nowrap",
          }}
          onClick={() => handleClick("/upload")}
        >
          Upload Image
        </Button>
      </Paper>
    </div>
  );
}
