import HeadBar from "../../components/Header";
import { Button, IconButton } from "@mui/material";
import { FiUploadCloud } from "react-icons/fi";
require("typeface-eb-garamond");
import "@fontsource/montserrat";
import { useEffect, useRef, useState } from "react";
import { UploadInfo } from "../../components/UploadInfo";
import { IoCloseOutline } from "react-icons/io5";

const allTags = [
  "Tag 1",
  "Tag 3",
  "Tag 4",
  "Tag 5",
  "Tag 6",
  "Tag 8",
  "Tag 95",
];

export const UploadPage = () => {
  const [uploadMeme, setUploadedMeme] = useState(null as any);
  const [overCost, setOverCost] = useState(false);
  const [overTags, setOverTags] = useState(false);
  const [postTags, setPostTags] = useState([] as Array<string>);
  const [postName, setPostName] = useState("");
  const [postCost, setPostCost] = useState(1);
  const [countFile, setCountFile] = useState(0);
  const [fileUrl, setFileUrl] = useState("");

  const uploadRef = useRef(null);

  useEffect(() => {
    if (!uploadMeme) {
      return;
    }
    const objectUrl = URL.createObjectURL(uploadMeme);
    setFileUrl(objectUrl);
  }, [uploadMeme]);

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
          <span style={{ marginLeft: 360 }}>Favourate Memes!</span>
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
          />
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
