require("typeface-eb-garamond");
import "@fontsource/montserrat";
import styles from "./MemeContainer.module.css";
import { FiThumbsUp, FiThumbsDown, FiDownloadCloud } from "react-icons/fi";
import { Button, IconButton, Snackbar, Alert } from "@mui/material";
import { CgDanger } from "react-icons/cg";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import Router from "next/router";
import { useEffect, useState, useRef } from "react";
import { getDownloadInfo } from "../pages/api/Download";
import { addLike } from "../pages/api/Post";

export const MemeContainer = (props: {
  src: string;
  memeName: string;
  cost: number;
}) => {
  const { src, memeName, cost } = props;
  const [downloadFail, setDownloadFail] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [likeSuccess, setLikeSuccess] = useState(false);
  const [likeFail, setLikeFail] = useState(false);

  const downloadRef = useRef(null);
  const handleDownload = async (ref: any) => {
    try {
      const res = await getDownloadInfo(src);
      ref.current.click();
      setDownloadSuccess(true);
      setDownloadFail(false);
    } catch (e) {
      setDownloadFail(true);
      setDownloadSuccess(false);
    }
  };
  const handleLike = async (el: any) => {
    try {
      const output = await addLike(src);
      setLikeSuccess(true);
      setLikeFail(false);
    } catch (e) {
      setLikeFail(true);
      setLikeSuccess(false);
    }
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
          <IconButton onClick={async () => await handleDownload(downloadRef)}>
            <FiDownloadCloud />
          </IconButton>
          <a href={src} download ref={downloadRef}></a>
          <span>
            <IconButton
              onClick={handleLike}
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
            <a
              href={`/report?post_url=${src}`}
              target="_blank"
              rel="noreferrer"
              style={{ cursor: "pointer" }}
            >
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
      {downloadFail ? (
        <Snackbar
          open={downloadFail}
          autoHideDuration={6000}
          onClose={() => setDownloadFail(false)}
          style={{ marginLeft: "36%", marginBottom: 10 }}
        >
          <Alert
            severity="error"
            onClose={() => setDownloadFail(false)}
            sx={{ width: "100%", fontSize: 16 }}
          >
            Sorry, not enough points for downloading
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}

      {downloadSuccess ? (
        <Snackbar
          open={downloadSuccess}
          autoHideDuration={6000}
          onClose={() => setDownloadSuccess(false)}
          style={{ marginLeft: "36%", marginBottom: 10 }}
        >
          <Alert
            onClose={() => setDownloadSuccess(false)}
            sx={{ width: "100%", fontSize: 16 }}
          >
            Download Successed!
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
      {likeSuccess ? (
        <Snackbar
          open={likeSuccess}
          autoHideDuration={6000}
          onClose={() => setLikeSuccess(false)}
          style={{ marginLeft: "36%", marginBottom: 10 }}
        >
          <Alert
            onClose={() => setLikeSuccess(false)}
            sx={{ width: "100%", fontSize: 16 }}
          >
            You Like A Meme!
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}

      {likeFail ? (
        <Snackbar
          open={likeFail}
          autoHideDuration={6000}
          onClose={() => setLikeFail(false)}
          style={{ marginLeft: "36%", marginBottom: 10 }}
        >
          <Alert
            onClose={() => setLikeFail(false)}
            sx={{ width: "100%", fontSize: 16 }}
          >
            Sorry, there might be some small issues exist in our product
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
    </div>
  );
};
