import dynamic from "next/dynamic";

const MemePage = dynamic(
  () => {
    return import("../../components/MemePage");
  },
  { ssr: false }
);

export const MemeAll = () => {
  return <MemePage />;
};
export default MemeAll;

// import HeadBar from "../../components/Header";
// require("typeface-eb-garamond");
// import testPhoto1 from "../../public/testPhoto1.jpeg";
// import "@fontsource/montserrat";
// import { MemeContainer } from "../../components/MemeContainer";
// import { useState, useEffect, useRef } from "react";
// import { PageSwitch } from "../../components/PageSwitch";
// import { IoMdArrowDropdown } from "react-icons/io";
// import { ClickAwayListener, Button } from "@mui/material";
// import { TagPopper } from "../../components/TagPopper";
// import { getAllTags } from "../api/Tags";
// import { getPostByPage } from "../api/Post";

// const arrayImage = [
//   {
//     src: testPhoto1.src,
//     memeName: "Test Meme 1",
//     cost: 50,
//   },
//   {
//     src: testPhoto1.src,
//     memeName: "Test Meme 1",
//     cost: 50,
//   },
//   {
//     src: testPhoto1.src,
//     userName: "Yiran Sun",
//     memeName: "Test Meme 1",
//     cost: 50,
//   },
//   {
//     src: testPhoto1.src,
//     userName: "Yiran Sun",
//     memeName: "Test Meme 1",
//     cost: 50,
//   },
//   {
//     src: testPhoto1.src,
//     userName: "Yiran Sun",
//     memeName: "Test Meme 1",
//     cost: 50,
//   },
//   {
//     src: testPhoto1.src,
//     userName: "Yiran Sun",
//     memeName: "Test Meme 1",
//     cost: 50,
//   },
//   {
//     src: testPhoto1.src,
//     userName: "Yiran Sun",
//     memeName: "Test Meme 1",
//     cost: 50,
//   },
//   {
//     src: testPhoto1.src,
//     userName: "Yiran Sun",
//     memeName: "Test Meme 1",
//     cost: 50,
//   },
//   {
//     src: testPhoto1.src,
//     userName: "Yiran Sun",
//     memeName: "Test Meme 1",
//     cost: 50,
//   },
//   {
//     src: testPhoto1.src,
//     userName: "Yiran Sun",
//     memeName: "Test Meme 1",
//     cost: 50,
//   },
// ];

// const TagItems = [
//   "Tag 1",
//   "Tag 3",
//   "Tag 4",
//   "Tag 5",
//   "Tag 6",
//   "Tag 8",
//   "Tag 95",
// ];

// export const MemePage = () => {
//   const [windowWidth, setWindowWidth] = useState(1440);
//   const [pageNum, setPageNum] = useState(0);
//   const [countPage, setCountPage] = useState(15);
//   const count = 0;
//   let limit = 9;
//   const tagRef = useRef(null);
//   const [tagPopOpen, setTagPopOpen] = useState(false);
//   const [selectedTags, setSelectedTags] = useState([] as Array<string>);
//   const [allTags, setAllTags] = useState([] as Array<string>);
//   const [calledAllTags, setCalledAllTags] = useState(false);
//   const [limitPerPage, setLimitPerPage] = useState(
//     window.innerWidth < 1700 ? 9 : 12
//   );
//   console.log(window.innerWidth);
//   const [memeInPage, setMemeInPage] = useState([] as Array<any>);
//   // const size = window.innerWidth;
//   useEffect(() => {
//     function updateSize() {
//       setWindowWidth(window.innerWidth);
//       //   if (window.innerWidth >= 1700) {
//       //     setLimitPerPage(12);
//       //   } else {
//       //     setLimitPerPage(9);
//       //   }
//     }
//     window.addEventListener("resize", updateSize);
//     updateSize();
//     return () => window.removeEventListener("resize", updateSize);
//   }, []);

//   useEffect(() => {
//     if (windowWidth >= 1700) {
//       setLimitPerPage(12);
//     } else {
//       setLimitPerPage(9);
//     }
//   }, [windowWidth]);

//   useEffect(() => {
//     const tagsWrapper = async () => {
//       if (calledAllTags == false) {
//         const data = await getAllTags();
//         setAllTags(data?.data);
//         setCalledAllTags(true);
//       }
//     };
//     tagsWrapper();
//   }, [allTags]);

//   useEffect(() => {
//     const func = async () => {
//       console.log(pageNum, limitPerPage);
//       const data = await getPostByPage(pageNum, limitPerPage);
//       setMemeInPage(data?.data[1]);
//       setCountPage(data?.data[0]);
//       if (pageNum >= data?.data[0]) {
//         setPageNum(data?.data[0] - 1);
//       }
//     };
//     func();
//   }, [pageNum, limitPerPage]);

//   const curArr = memeInPage?.slice(0, limitPerPage);
//   let curArr2 = curArr.slice(0, 3);
//   let curArr3 = curArr.slice(3, 6);
//   let curArr4 = curArr.slice(6, 9);
//   if (windowWidth >= 1600) {
//     curArr2 = curArr.slice(0, 4);
//     curArr3 = curArr.slice(4, 8);
//     curArr4 = curArr.slice(8, 12);
//   }

//   return (
//     <div>
//       <HeadBar></HeadBar>
//       <div
//         style={{
//           // paddingRight: 200,
//           paddingLeft: 70,
//           fontSize: 80,
//           fontWeight: 500,
//           fontFamily: "EB Garamond",
//           marginTop: 120,
//           alignContent: "center",
//           alignItems: "center",
//           display: "flex",
//           lineHeight: "57%",
//           marginBottom: 150,
//           justifyContent: "space-between",
//         }}
//       >
//         <span>
//           <span
//             style={{
//               borderBottomColor: "rgb(251, 235, 79)",
//               borderBottomStyle: "solid",
//               borderBottomWidth: 10,
//               position: "absolute",
//             }}
//           >
//             Find Memes
//           </span>
//           <span style={{ marginLeft: 400 }}>You Want!</span>
//         </span>
//         <span>
//           <Button
//             variant="outlined"
//             style={{
//               borderRadius: 0,
//               borderColor: "#80774f",
//               borderWidth: 2,
//               fontFamily: "montserret",
//               color: "black",
//               textTransform: "none",
//             }}
//             onClick={() => {
//               setTagPopOpen(true);
//             }}
//             ref={tagRef}
//           >
//             <span style={{ display: "flex", alignItems: "center" }}>
//               <span>Filter By Tags</span>
//               <IoMdArrowDropdown style={{ marginLeft: 10 }} />
//             </span>
//           </Button>
//         </span>
//         <TagPopper
//           anchorEl={tagRef}
//           tagPopOpen={tagPopOpen}
//           setTagPopOpen={setTagPopOpen}
//           TagItems={allTags}
//           selectedTags={selectedTags}
//           setSelectedTags={setSelectedTags}
//         ></TagPopper>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           paddingRight: 70,
//           paddingLeft: 70,
//         }}
//       >
//         {curArr2.map((el, idx) => {
//           return (
//             <div key={idx}>
//               <MemeContainer
//                 src={el.src}
//                 memeName={el.memeName}
//                 cost={el.cost}
//               />
//             </div>
//           );
//         })}
//       </div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           paddingRight: 70,
//           paddingLeft: 70,
//         }}
//       >
//         {curArr3.map((el, idx) => {
//           return (
//             <div key={idx}>
//               <MemeContainer
//                 src={el.src}
//                 memeName={el.memeName}
//                 cost={el.cost}
//               />
//             </div>
//           );
//         })}
//       </div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           paddingRight: 70,
//           paddingLeft: 70,
//         }}
//       >
//         {curArr4.map((el, idx) => {
//           return (
//             <div key={idx}>
//               <MemeContainer
//                 src={el.src}
//                 memeName={el.memeName}
//                 cost={el.cost}
//               />
//             </div>
//           );
//         })}
//       </div>
//       <div style={{ marginLeft: "75%", marginBottom: 50 }}>
//         <PageSwitch
//           pageNum={pageNum}
//           setPageNum={setPageNum}
//           countPage={countPage}
//         />
//       </div>
//     </div>
//   );
// };

// export default MemePage;
