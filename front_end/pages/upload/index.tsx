import HeadBar from "../../components/Header";
import { Button, IconButton, Alert, Card, Snackbar } from "@mui/material";
import { FiUploadCloud } from "react-icons/fi";
require("typeface-eb-garamond");
import "@fontsource/montserrat";
import { useEffect, useRef, useState } from "react";
import { UploadInfo } from "../../components/UploadInfo";
import { IoCloseOutline } from "react-icons/io5";
import { getAllTags } from "../api/Tags";

// const allTags = [
//   "Tag 1",
//   "Tag 3",
//   "Tag 4",
//   "Tag 5",
//   "Tag 6",
//   "Tag 8",
//   "Tag 95",
// ];

export const UploadPage = () => {
  const [uploadMeme, setUploadedMeme] = useState(null as any);
  const [overCost, setOverCost] = useState(false);
  const [overTags, setOverTags] = useState(false);
  const [overName, setOverName] = useState(false);
  const [postTags, setPostTags] = useState([] as Array<string>);
  const [postName, setPostName] = useState("");
  const [postCost, setPostCost] = useState(1);
  const [countFile, setCountFile] = useState(0);
  const [fileUrl, setFileUrl] = useState("");
  const [allTags, setAllTags] = useState([] as Array<string>);
  const [called, setCalled] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [disableButton1, setDisableButton1] = useState(true);
  const [disableButton2, setDisableButton2] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const uploadRef = useRef(null);

  useEffect(() => {
    if (!uploadMeme) {
      return;
    }
    const objectUrl = URL.createObjectURL(uploadMeme);
    setFileUrl(objectUrl);
  }, [uploadMeme]);

  useEffect(() => {
    const func = async () => {
      const data = await getAllTags();
      if (data?.data !== allTags) {
        setAllTags(data?.data);
        setCalled(true);
      }
    };
    func();
  }, [called]);

  const handleUpload = (ref: any) => {
    ref.current.value = "";
    ref.current.click();
  };
  const handleChange = (el: any) => {
    if (el.target.files.length == 0) {
      return;
    }
    setUploadedMeme(el.target.files[0]);
    setCountFile(1);
  };
  const handleRemove = () => {
    setCountFile(0);
    setUploadedMeme(null);
    setFileUrl("");
  };
  return (
    <div>
      <HeadBar></HeadBar>
      <div
        style={{
          paddingLeft: "12.5%",
          fontSize: 80,
          fontWeight: 500,
          fontFamily: "EB Garamond",
          marginTop: 120,
          alignContent: "center",
          alignItems: "center",
          display: "flex",
          lineHeight: "57%",
          marginBottom: 100,
          justifyContent: "space-between",
        }}
      >
        <span>
          <span
            style={{
              borderBottomColor: "rgb(251, 235, 79)",
              borderBottomStyle: "solid",
              borderBottomWidth: 10,
              position: "absolute",
            }}
          >
            Share Your
          </span>
          <span style={{ marginLeft: 360 }}>Favourite Memes!</span>
        </span>
      </div>
      <div>
        <div
          style={{
            paddingLeft: "12.5%",
            paddingRight: "25%",
            justifyContent: "left",
            alignContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <div>
            <Button
              style={{
                backgroundColor: "#80774f",
                marginRight: 200,
                color: "white",
                borderRadius: 0,
                textTransform: "none",
                height: 52,
                fontSize: 15,
                fontFamily: "montserrat",
                fontWeight: "bolder",
              }}
              onClick={() => handleUpload(uploadRef)}
            >
              <FiUploadCloud style={{ marginLeft: 10, marginRight: 10 }} />
              <span style={{ marginRight: 10 }}>Select Memes</span>
            </Button>
            {uploadMeme ? (
              <div
                style={{ display: "flex", alignItems: "center", marginTop: 10 }}
              >
                <span
                  style={{ marginTop: 5, marginRight: 3, cursor: "pointer" }}
                >
                  <IoCloseOutline
                    style={{ color: "black", fontSize: 18 }}
                    onClick={handleRemove}
                  />
                </span>
                <span>
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: 15,
                      fontFamily: "montserrat",
                      cursor: "pointer",
                    }}
                  >
                    {uploadMeme.name}
                  </a>
                </span>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <input
            ref={uploadRef}
            type="file"
            accept=".jpg,.jpeg,.png"
            style={{ display: "none" }}
            onChange={handleChange}
            id={"input"}
          ></input>
          <span
            style={{
              color: "#757575",
              fontFamily: "montserrat",
              fontWeight: 500,
              flexDirection: "column",
              display: "inline-flex",
            }}
          >
            <span>Choose Memes From Your Local Machine And </span>
            <div>Customize their uploaded information</div>
          </span>
        </div>
        <div style={{ paddingLeft: "12.5%", marginTop: 50 }}>
          <UploadInfo
            postTags={postTags}
            setPostTags={setPostTags}
            postName={postName}
            setPostName={setPostName}
            postCost={postCost}
            setPostCost={setPostCost}
            allTags={allTags}
            uploadMeme={uploadMeme}
            overTags={overTags}
            setOverTags={setOverTags}
            overCost={overCost}
            setOverCost={setOverCost}
            overName={overName}
            setOverName={setOverName}
            disableButton={disableButton}
            setDisableButton={setDisableButton}
            disableButton1={disableButton1}
            setDisableButton1={setDisableButton1}
            disableButton2={disableButton2}
            setDisableButton2={setDisableButton2}
            submitSuccess={submitSuccess}
            setSubmitSuccess={setSubmitSuccess}
          />
        </div>
      </div>
      {overTags ? (
        <Snackbar
          open={overTags}
          autoHideDuration={6000}
          onClose={() => setOverTags(false)}
          style={{ marginLeft: "30%", marginBottom: 20 }}
        >
          <Alert
            severity="error"
            onClose={() => setOverTags(false)}
            sx={{ width: "100%", fontSize: 16 }}
          >
            Sorry Maximum 5 Tags Could be attached to Uploaded Meme
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
      {overCost ? (
        <Snackbar
          open={overCost}
          autoHideDuration={6000}
          onClose={() => {
            setOverCost(false);
          }}
          style={{ marginLeft: "30%", marginBottom: 20 }}
        >
          <Alert
            severity="error"
            onClose={() => {
              setOverCost(false);
            }}
            sx={{ width: "100%", fontSize: 16 }}
          >
            Sorry the Maximum Post Cost Could be set is 100 and Must Be Integer
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
      {overName ? (
        <Snackbar
          open={overName}
          autoHideDuration={6000}
          onClose={() => setOverName(false)}
          style={{ marginLeft: "30%", marginBottom: 20 }}
        >
          <Alert
            severity="error"
            onClose={() => setOverName(false)}
            sx={{ width: "100%", fontSize: 16 }}
          >
            Sorry the Maximum 15 characters allowed for the Post Name
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}

      {submitSuccess ? (
        <Snackbar
          open={submitSuccess}
          autoHideDuration={6000}
          onClose={() => setSubmitSuccess(false)}
          style={{ marginLeft: "30%", marginBottom: 20 }}
        >
          <Alert
            onClose={() => setSubmitSuccess(false)}
            sx={{ width: "100%", fontSize: 16 }}
          >
            The Uploading Process Succeed!
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
    </div>
  );
};

export default UploadPage;
