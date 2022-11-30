require("typeface-eb-garamond");
import "@fontsource/montserrat";
import styles from "./MemeContainer.module.css";
import { FiThumbsUp, FiThumbsDown, FiDownloadCloud } from "react-icons/fi";
import { Button, IconButton } from "@mui/material";
import { CgDanger } from "react-icons/cg";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import Router from "next/router";
import { addLike } from "../pages/api/Post";
import { useState } from "react";

export const MemeContainer = (props: {
  src: string;
  memeName: string;
  cost: number;
}) => {
  const { src, memeName, cost } = props;
  const handleClick = (el: any) => {};
  const handleLike = async (el: any) => {
    let output = await addLike(src);
    el.target.style.color = "rgb(238, 75, 43)";
  };

  return (
    <div
      style={{
        paddingLeft: 50,
        paddingRight: 50,
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 50,
        marginTop: 50,
      }}
    >
      <div
        style={{
          backgroundColor: "#f5f5f5",
          paddingTop: 30,
          paddingBottom: 30,
          paddingRight: 50,
          paddingLeft: 50,
        }}
      >
        <div style={{ fontFamily: "Montserrat", alignItems: "center" }}>
          <div
            style={{
              fontFamily: "EB Garamond",
              fontSize: 20,
              fontWeight: 500,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            {memeName}
            <span style={{ fontFamily: "EB Garamond", fontSize: 20 }}>
              {`${cost} pts`}
            </span>
          </div>
        </div>
        <div
          onContextMenu={(el) => {
            el.preventDefault();
          }}
        >
          <img
            className={styles.image}
            src={src}
            // style={{ userSelect: "none" }}
            width="200"
            height="200"
          ></img>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <a href={src} download>
            <IconButton
            //   variant="outlined"
            //   style={{
            //     borderColor: "black",
            //     borderRadius: 0,
            //     // borderWidth: "1.2px",
            //     // maxWidth: 4,
            //   }}
            >
              <FiDownloadCloud />
            </IconButton>
          </a>
          <span>
            <IconButton
              onClick={handleClick}
              //   variant="outlined"
              //   style={{
              //     color: "black",
              //     borderColor: "black",
              //     borderRadius: 0,
              //     borderWidth: "1.2px",
              //     width: 20,
              //     paddingLeft: 0,
              //     paddingRight: 0,
              //   }}
              //   size="small"
            >
              <FiThumbsUp 
                onClick={handleLike}
              />
            </IconButton>
            <a href={`/report?post_url=${src}`} target="_blank" style={{cursor: "pointer"}}>
            <IconButton>
              <CgDanger
                style={{ fontSize: 28 }}
                // onClick={() => Router.push(`/report?post_url=${src}`)}
              />
            </IconButton>
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
