import "@fontsource/montserrat";
import {
  TextField,
  Button,
  MenuItem,
  MenuList,
  Popper,
  Paper,
  ClickAwayListener,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { TagsCard } from "./TagsCard";
import { createPost } from "../pages/api/Post";
require("typeface-eb-garamond");

export const UploadInfo = (props: {
  postName: string;
  setPostName: any;
  postCost: number;
  setPostCost: any;
  postTags: Array<string>;
  uploadMeme: File;
  setPostTags: any;
  allTags: Array<string>;
  overFlowName?: boolean;
  overCost?: boolean;
  overTags?: boolean;
}) => {
  const {
    postName,
    setPostName,
    postCost,
    setPostCost,
    postTags,
    setPostTags,
    allTags,
    uploadMeme,
  } = props;
  const [searchWords, setSearchWords] = useState("");
  const menuRef = useRef(null);
  const allTagsCopy = allTags.slice();
  const tagsRemained = allTagsCopy.filter((el) => {
    let capWords = el.toUpperCase();
    let capSearchWords = searchWords.toUpperCase();
    return capWords.includes(capSearchWords) && !postTags.includes(el);
  });
  const handlePostName = (el: any) => {
    setPostName(el.target.value);
  };
  const handlePostCost = (el: any) => {
    setPostCost(el.target.value);
  };
  const handleSearch = (el: any) => {
    setSearchWords(el.target.value);
  };
  const handleKeyDown = (el: any) => {
    if (searchWords == "") {
      return;
    }
    if (el.keyCode == 13) {
      let newArr = postTags;
      newArr.push(searchWords);
      setPostTags(newArr);
      el.target.value = "";
      setSearchWords("");
    }
  };
  const handleInsertTags = (el: any) => {
    let newArr = postTags;
    newArr.push(el.target.innerText);
    setPostTags(newArr);
    setSearchWords("");
  };

  const handleClickAway = () => {
    setSearchWords("");
  };

  const handleRemove = (e: any) => {
    let newArr = postTags.filter((el) => {
      return el != e.current.innerText;
    });
    setPostTags(newArr);
  };

  const uploadMemes = async () => {
    try {
      const res = await createPost(uploadMeme, postCost, postName, postTags);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div style={{ fontFamily: "montserrat", fontSize: 14 }}>
      <div style={{ display: "flex" }}>
        <span>
          <div style={{ marginBottom: 10 }}>Post Name: *</div>
          <TextField
            sx={{ width: 250, height: 50 }}
            inputProps={{
              style: {
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 8,
                paddingBottom: 8,
                fontFamily: "montserrat",
                fontSize: 14,
                borderRadius: 0,
                borderWidth: 10,
              },
            }}
            onChange={handlePostName}
            autoComplete="off"
          />
        </span>
        <span style={{ marginLeft: 150 }}>
          <div style={{ marginBottom: 10 }}>Post Cost: *</div>
          <TextField
            sx={{ width: 250, height: 50 }}
            inputProps={{
              style: {
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 8,
                paddingBottom: 8,
                fontFamily: "montserrat",
                fontSize: 14,
                borderRadius: 0,
                borderWidth: 10,
              },
            }}
            onChange={handlePostCost}
            autoComplete="off"
          />
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {postTags.map((el, idx) => {
          return (
            <TagsCard
              tagName={el}
              handleRemove={handleRemove}
              key={`${el}_${idx}`}
            />
          );
        })}
      </div>
      <div style={{ marginTop: 20, marginBottom: 10 }}>Select Tags:</div>
      <TextField
        id={"tagSearch"}
        sx={{ width: 250, height: 50 }}
        inputProps={{
          style: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 8,
            paddingBottom: 8,
            fontFamily: "montserrat",
            fontSize: 14,
            borderRadius: 0,
            borderWidth: 10,
          },
        }}
        autoComplete="off"
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        ref={menuRef}
      />
      <ClickAwayListener onClickAway={handleClickAway} mouseEvent="onMouseDown">
        <Popper
          anchorEl={menuRef.current}
          open={searchWords != ""}
          placement="bottom-start"
          disablePortal={false}
          modifiers={[{ name: "flip", enabled: false }]}
        >
          <Paper>
            <MenuList
              style={{
                fontFamily: "montserrat",
                maxHeight: 200,
                overflow: "scroll",
              }}
            >
              {tagsRemained.map((el, idx) => {
                return (
                  <MenuItem key={idx} value={el} onClick={handleInsertTags}>
                    {el}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Paper>
        </Popper>
      </ClickAwayListener>
      <span>
        <Button
          style={{
            backgroundColor: "rgb(128, 119, 79)",
            color: "white",
            fontWeight: 500,
            width: "20%",
            fontSize: 15,
            letterSpacing: 2,
            height: 36.13,
            marginLeft: 150,
            borderRadius: 0,
            // fontFamily: "EB Garamond",
          }}
          onClick={async () => await uploadMemes()}
        >
          SUBMIT{" "}
        </Button>
      </span>
    </div>
  );
};
