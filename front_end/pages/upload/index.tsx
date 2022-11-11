import HeadBar from "../../components/Header";
import { Button } from "@mui/material";
import { FiUploadCloud } from "react-icons/fi";
require("typeface-eb-garamond");
import "@fontsource/montserrat";
import { useEffect, useRef, useState } from "react";
export const UploadPage = () => {
  const [uploaedMeme, setUploadedMeme] = useState(null);
  const uploadRef = useRef(null);
  const handleUpload = (ref: any) => {
    ref.current.click();
  };
  //   useEffect(() => {
  //     const selectedFile = document.getElementById("input");
  //     console.log(selectedFile);
  //   });
  const handleChange = (el: any) => {
    setUploadedMeme(el.target.files[0]);
  };
  return (
    <div>
      <HeadBar></HeadBar>
      <div
        style={{
          paddingLeft: 70,
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
            paddingLeft: 150,
            paddingRight: "25%",
            justifyContent: "left",
            alignContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Button
            style={{
              backgroundColor: "#80774f",
              marginRight: 200,
              color: "white",
              borderRadius: 0,
              textTransform: "none",
              height: 55,
              fontSize: 15,
              fontFamily: "montserrat",
              fontWeight: "bolder",
            }}
            onClick={() => handleUpload(uploadRef)}
          >
            <FiUploadCloud style={{ marginLeft: 10, marginRight: 10 }} />
            <span style={{ marginRight: 10 }}>Select Memes</span>
          </Button>
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
          <div>
            <Button>submit </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
