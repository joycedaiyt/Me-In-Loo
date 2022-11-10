require("typeface-eb-garamond");
import "@fontsource/montserrat";
import styles from "./MemeContainer.module.css";
import { FiThumbsUp, FiThumbsDown, FiDownloadCloud } from "react-icons/fi";
import { Button, IconButton } from "@mui/material";

export const MemeContainer = (props: {
  src: string;
  memeName: string;
  cost: number;
}) => {
  const { src, memeName, cost } = props;
  const handleClick = (el: any) => {
    console.log(el);
  };
  return (
    <div
      style={{
        paddingLeft: 50,
        paddingRight: 50,
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 100,
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
              <FiThumbsUp />
            </IconButton>
            <IconButton>
              <FiThumbsDown />
            </IconButton>
          </span>
        </div>
      </div>
    </div>
  );
};
