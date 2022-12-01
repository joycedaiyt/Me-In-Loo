import HeadBar from "./Header";
import "@fontsource/montserrat";
import emptyProfilePic from "../public/empty_profile.png";
import backgroundImage from "../public/feed-background.jpeg";
import emptyPost from "../public/defaultPost.png";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import "@fontsource/chelsea-market";
import { IoCloseOutline } from "react-icons/io5";
import { EditText, EditTextarea } from "react-edit-text";
import "react-edit-text/dist/index.css";
import React from "react";
import {
  getAccountInfo,
  updateProfilePic,
  updateProfileDescription,
  getMostPopularPost,
} from "../pages/api/AccountInfo";

export const AccountInfo = () => {
  const [userEmail, setUserEmail] = useState("");
  const [profilePic, setProfilePic] = useState(emptyProfilePic.src as any);
  const [profileDescription, setProfileDescription] = useState("");
  const [popularPost, setPopularPost] = useState(emptyPost.src as any);
  const [popularPostName, setPopularPostName] = useState(
    "Upload Your First Post!"
  );
  const [postCount, setPostCount] = useState(0);
  const [points, setPoints] = useState(0);
  const [uploadProfilePic, setUploadProfilePic] = useState(null as any);
  const [fileUrl, setFileUrl] = useState("");
  const [isHover, setIsHover] = useState(false);
  const [emailHover, setEmailHover] = useState(false);
  const [pointHover, setPointHover] = useState(false);
  const [postcountHover, setPostCountHover] = useState(false);

  const uploadRef = useRef(null);

  useEffect(() => {
    const func = async () => {
      const data = await getAccountInfo();
      const post = await getMostPopularPost();
      setUserEmail(data.data.user_email);
      if (data.data.profile_pic_url != null) {
        setProfilePic(data.data.profile_pic_url);
      }
      setProfileDescription(data.data.prof_description);
      setPostCount(data.data.post_count);
      setPoints(data.data.points);
      console.log(data.data);
      if (post.data.post_url != "") {
        console.log("setting");
        setPopularPost(post.data.post_url);
        setPopularPostName(post.data.post_name);
      }
    };
    func();
  });

  useEffect(() => {
    if (!uploadProfilePic) {
      return;
    }
    const objectUrl = URL.createObjectURL(uploadProfilePic);
    setFileUrl(objectUrl);
  }, [uploadProfilePic]);

  const changeProfileDescription = async (el: any) => {
    try {
      const res = await updateProfileDescription(el.value);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpload = (ref: any) => {
    ref.current.value = "";
    ref.current.click();
  };

  const changeProfilePic = async () => {
    try {
      const res = await updateProfilePic(uploadProfilePic);
      handleRemove();
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = async (el: any) => {
    if (el.target.files.length == 0) {
      return;
    }
    setUploadProfilePic(el.target.files[0]);
  };

  const handleRemove = () => {
    setUploadProfilePic(null);
    setFileUrl("");
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleEmailMouseEnter = () => {
    setEmailHover(true);
  };

  const handleEmailMouseLeave = () => {
    setEmailHover(false);
  };

  const handlePointMouseEnter = () => {
    setPointHover(true);
  };

  const handlePointMouseLeave = () => {
    setPointHover(false);
  };

  const handlePostCountMouseEnter = () => {
    setPostCountHover(true);
  };

  const handlePostCountMouseLeave = () => {
    setPostCountHover(false);
  };

  return (
    <div>
      <HeadBar></HeadBar>
      <div
        style={{
          display: "flex",
          backgroundImage: `url(${backgroundImage.src})`,
          backgroundSize: "cover",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            marginTop: 104,
            marginLeft: 155,
            display: "flex",
            lineHeight: "57%",
            marginBottom: 180,
            justifyContent: "space-between",
            fontSize: 80,
            fontWeight: 500,
            fontFamily: "EB Garamond",
            borderBottomColor: "rgb(251, 235, 79)",
            borderBottomStyle: "solid",
            borderBottomWidth: 10,
            position: "absolute",
          }}
        >
          WELCOME!
        </div>
        <span>
          <div
            style={{
              marginTop: "60%",
              paddingLeft: "50%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: isHover ? "lightblue" : "rgba(0,0,0,0)",
                  // background: "red",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  style={{
                    borderRadius: "50%",
                    border: "3px solid black",
                    borderStyle: "double",
                    borderWidth: "12px",
                  }}
                  src={profilePic}
                  height={350}
                  width={350}
                  alt="testimg"
                  onClick={() => handleUpload(uploadRef)}
                />
                <label
                  style={{
                    position: "relative",
                    top: "10px",
                    fontFamily: "Chelsea Market",
                    color: isHover ? "black" : "white",
                    marginTop: 7,
                    fontSize: 15,
                    marginBottom: 10,
                  }}
                >
                  Update Profile Picture
                </label>
              </Button>
              {uploadProfilePic ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      // display: "flex",
                      // alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <span
                      style={{
                        // marginLeft: 100,
                        marginTop: 5,
                        marginRight: 3,
                        cursor: "pointer",
                      }}
                    >
                      <IoCloseOutline
                        style={{ color: "white", fontSize: 18 }}
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
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        {uploadProfilePic.name}
                      </a>
                    </span>
                  </div>
                  <div>
                    <Button
                      style={{
                        backgroundColor: "rgba(87, 115, 143)",
                        paddingLeft: 20,
                        paddingRight: 20,
                        color: "white",
                        fontWeight: 500,
                        width: 70,
                        fontSize: 12,
                        letterSpacing: 1,
                        height: 36.13,
                        // marginLeft: 130,
                        marginTop: 10,
                        borderRadius: 10,
                        // fontFamily: "EB Garamond",
                      }}
                      onClick={changeProfilePic}
                    >
                      Confirm
                    </Button>
                  </div>
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
          </div>
        </span>
        <span>
          <div
            style={{
              fontFamily: "Chelsea Market",
              marginLeft: 370,
              paddingTop: "11%",
              fontSize: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                whiteSpace: "nowrap",
                paddingTop: "8%",
                fontWeight: "bold",
              }}
              onMouseEnter={handleEmailMouseEnter}
              onMouseLeave={handleEmailMouseLeave}
            >
              <strong>
                <label className="mr-2" style={{ fontWeight: "bold" }}>
                  Email:{" "}
                </label>
              </strong>
              <EditText
                style={{
                  backgroundColor: emailHover ? "lightblue" : "rgba(0,0,0,0)",
                }}
                defaultValue={userEmail}
                inline
                readonly
              />
            </div>
            <div
              style={{
                whiteSpace: "nowrap",
                paddingTop: "8%",
                fontWeight: "bold",
              }}
              onMouseEnter={handlePostCountMouseEnter}
              onMouseLeave={handlePostCountMouseLeave}
            >
              <strong>
                <label className="mr-2" style={{ fontWeight: "bold" }}>
                  # of Posts:{" "}
                </label>
              </strong>
              <EditText
                style={{
                  fontFamily: "montserrat",
                  backgroundColor: postcountHover
                    ? "lightblue"
                    : "rgba(0,0,0,0)",
                }}
                defaultValue={postCount.toString()}
                inline
                readonly
              />
            </div>
            <div
              style={{
                whiteSpace: "nowrap",
                paddingTop: "8%",
                fontWeight: "bold",
              }}
              onMouseEnter={handlePointMouseEnter}
              onMouseLeave={handlePointMouseLeave}
            >
              <strong>
                <label className="mr-2" style={{ fontWeight: "bold" }}>
                  Points:{" "}
                </label>
              </strong>
              <EditText
                style={{
                  fontFamily: "montserrat",
                  backgroundColor: pointHover ? "lightblue" : "rgba(0,0,0,0)",
                }}
                defaultValue={points.toString()}
                inline
                readonly
              />
            </div>
            <div
              style={{
                // display: "block",
                paddingTop: 20,
                marginTop: 80,
                marginLeft: 80,
                backgroundColor: "rgba(233, 237, 242)",
                paddingBottom: 50,
                paddingRight: 40,
                paddingLeft: 40,
                marginBottom: 30,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: 350,
              }}
            >
              <strong>
                <label className="mr-2" style={{ paddingTop: "3px" }}>
                  Your Most Liked Meme:{" "}
                </label>
              </strong>
              <div
              // style={{
              //   backgroundColor: "#f5f5f5",
              //   paddingBottom: 30,
              //   paddingRight: 50,
              //   paddingLeft: 50,
              //   display: "flex",
              //   flexDirection: "column",
              //   justifyContent: "center",
              //   alignItems: "center",
              // }}
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
                      marginTop: 10,
                    }}
                  >
                    {popularPostName}
                    {/* <span style={{ fontFamily: "EB Garamond", fontSize: 20 }}>
                    {`${cost} pts`} */}
                    {/* </span> */}
                  </div>
                </div>
                <div>
                  <img src={popularPost} width="200" height="200"></img>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </span>
        <span>
          <div
            style={{
              display: "block",
              marginTop: 180,
              fontFamily: "Chelsea Market",
              fontSize: "20px",
              marginLeft: -200,
            }}
          >
            <strong>
              <label className="mr-2" style={{ paddingTop: "3px" }}>
                Description:{" "}
              </label>
            </strong>
            <EditTextarea
              name="description"
              rows={4}
              style={{
                paddingTop: 0,
                fontFamily: "montserrat",
                width: 300,
                fontSize: 16,
                // backgroundColor: "white",
              }}
              defaultValue={profileDescription}
              placeholder="Enter your profile Description..."
              onSave={changeProfileDescription}
            />
          </div>
        </span>
      </div>
    </div>
  );
};

export default AccountInfo;
