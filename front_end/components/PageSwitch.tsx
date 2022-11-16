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
    if (pageNum + 1 >= countPage) {
      setPageNum(0);
      setInput(1);
    } else {
      setInput(pageNum + 2);
      setPageNum(pageNum + 1);
    }
  };
  const handlePrev = () => {
    if (pageNum - 1 < 0) {
      setPageNum(countPage - 1);
      setInput(countPage);
    } else {
      setPageNum(pageNum - 1);
    }
  };
  const handleOpen = () => {
    setOpenInputBox(true);
  };

  const handleIuputChange = (e: any) => {
    if (/^[0-9]*$/.test(e.target.value)) {
      setInput(e.target.value);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode != 13) {
      // let input = parseInt(input);
      if (0 < input && input <= countPage) {
        setInput(input);
      }
    }
    if (e.keyCode == 13) {
      if (0 < input && input <= countPage) {
        setPageNum(input - 1);
      }
      setOpenInputBox(false);
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
        <MdOutlineKeyboardArrowLeft
          style={{ marginTop: 5, cursor: "pointer" }}
          onClick={handlePrev}
        />
        <span
          style={{ marginRight: 20, cursor: "pointer" }}
          onClick={handlePrev}
        >
          prev
        </span>
        {!openInputBox ? (
          <span onClick={handleOpen}>{pageNum + 1} </span>
        ) : (
          <TextField
            inputProps={{
              style: {
                paddingLeft: 5,
                width: 35,
                paddingRight: 5,
                paddingTop: 0,
                paddingBottom: 0,
              },
            }}
            sx={{ cursor: "pointer" }}
            variant="outlined"
            // value={input}
            onChange={handleIuputChange}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          ></TextField>
        )}
        <span> &nbsp;{`/ ${countPage}`}</span>
        <span
          style={{ marginLeft: 20, cursor: "pointer" }}
          onClick={handleNext}
        >
          next
        </span>
        <MdOutlineKeyboardArrowRight
          style={{ marginTop: 5, cursor: "pointer" }}
          onClick={handleNext}
        />
      </span>
    </div>
  );
};
