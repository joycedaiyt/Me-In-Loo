import HeadBar from "../../components/Header";
require("typeface-eb-garamond");
import testPhoto1 from "../../public/testPhoto1.jpeg";
import "@fontsource/montserrat";
import { MemeContainer } from "../../components/MemeContainer";
import { useState, useEffect } from "react";
import { strict } from "assert";
import { PageSwitch } from "../../components/PageSwitch";

const arrayImage = [
  {
    src: testPhoto1.src,
    memeName: "Test Meme 1",
    cost: 50,
  },
  {
    src: testPhoto1.src,
    memeName: "Test Meme 1",
    cost: 50,
  },
  {
    src: testPhoto1.src,
    userName: "Yiran Sun",
    memeName: "Test Meme 1",
    cost: 50,
  },
  {
    src: testPhoto1.src,
    userName: "Yiran Sun",
    memeName: "Test Meme 1",
    cost: 50,
  },
  {
    src: testPhoto1.src,
    userName: "Yiran Sun",
    memeName: "Test Meme 1",
    cost: 50,
  },
  {
    src: testPhoto1.src,
    userName: "Yiran Sun",
    memeName: "Test Meme 1",
    cost: 50,
  },
  {
    src: testPhoto1.src,
    userName: "Yiran Sun",
    memeName: "Test Meme 1",
    cost: 50,
  },
  {
    src: testPhoto1.src,
    userName: "Yiran Sun",
    memeName: "Test Meme 1",
    cost: 50,
  },
  {
    src: testPhoto1.src,
    userName: "Yiran Sun",
    memeName: "Test Meme 1",
    cost: 50,
  },
  {
    src: testPhoto1.src,
    userName: "Yiran Sun",
    memeName: "Test Meme 1",
    cost: 50,
  },
];

export const MemePage = () => {
  const [windowWidth, setWindowWidth] = useState(1440);
  const [pageNum, setPageNum] = useState(0);
  const count = 0;
  let limit = 9;
  // const size = window.innerWidth;
  useEffect(() => {
    function updateSize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  if (windowWidth >= 1600) {
    limit = 12;
  }
  const curArr = arrayImage.slice(pageNum * limit, (pageNum + 1) * limit);
  let curArr2 = curArr.slice(0, 3);
  let curArr3 = curArr.slice(3, 6);
  let curArr4 = curArr.slice(6, 9);
  if (windowWidth >= 1600) {
    curArr2 = curArr.slice(0, 4);
    curArr3 = curArr.slice(4, 8);
    curArr4 = curArr.slice(8, 12);
  }
  let countPage = 15;

  return (
    <div>
      <HeadBar></HeadBar>
      <div
        style={{
          paddingRight: 70,
          paddingLeft: 40,
          fontSize: 80,
          fontWeight: 500,
          fontFamily: "EB Garamond",
          marginTop: 120,
          alignContent: "center",
          lineHeight: "57%",
          marginBottom: 200,
        }}
      >
        <span
          style={{
            borderBottomColor: "rgb(251, 235, 79)",
            borderBottomStyle: "solid",
            borderBottomWidth: 10,
            position: "absolute",
          }}
        >
          Find Memes
        </span>
        <span style={{ marginLeft: 400 }}>You Want!</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: 70,
          paddingLeft: 70,
        }}
      >
        {curArr2.map((el, idx) => {
          return (
            <div key={idx}>
              <MemeContainer
                src={el.src}
                memeName={el.memeName}
                cost={el.cost}
              />
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: 70,
          paddingLeft: 70,
        }}
      >
        {curArr3.map((el, idx) => {
          return (
            <div key={idx}>
              <MemeContainer
                src={el.src}
                memeName={el.memeName}
                cost={el.cost}
              />
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: 70,
          paddingLeft: 70,
        }}
      >
        {curArr4.map((el, idx) => {
          return (
            <div key={idx}>
              <MemeContainer
                src={el.src}
                memeName={el.memeName}
                cost={el.cost}
              />
            </div>
          );
        })}
      </div>
      <PageSwitch
        pageNum={pageNum}
        setPageNum={setPageNum}
        countPage={countPage}
      />
    </div>
  );
};

export default MemePage;
