import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { TextField } from "@mui/material";
import "@fontsource/montserrat";
import { useState } from "react";

export const PageSwitch = (props: {
  pageNum: number;
  setPageNum: any;
  countPage: number;
}) => {
  const { pageNum, setPageNum, countPage } = props;
  const [input, setInput] = useState(pageNum + 1);
  const [openInputBox, setOpenInputBox] = useState(false);
  const handleNext = () => {
    if (pageNum + 1 > countPage) {
      setPageNum(0);
    } else {
      setPageNum(pageNum + 1);
    }
  };
  const handlePrev = () => {
    if (pageNum - 1 < 0) {
      setPageNum(countPage);
      setInput(countPage);
    } else {
      setPageNum(pageNum - 1);
    }
  };

  return (
    <div>
      <span
        style={{
          fontFamily: "montserrat",
          fontSize: 20,
          display: "flex",
          alignItems: "center",
        }}
      >
        <MdOutlineKeyboardArrowLeft style={{ marginTop: 5 }} />
        <span style={{ marginRight: 20 }}>prev</span>
        {!openInputBox ? <span>{pageNum + 1} </span> : <TextField></TextField>}
        <span> &nbsp;{`/ ${countPage}`}</span>
        <span style={{ marginLeft: 20 }}>next</span>
        <MdOutlineKeyboardArrowRight style={{ marginTop: 5 }} />
      </span>
    </div>
  );
};
