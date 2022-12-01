import HeadBar from "./Header";
require("typeface-eb-garamond");
import "@fontsource/montserrat";
import { RankingGraph } from "./RankingGraph";
import testPhoto1 from "../public/testPhoto1.jpeg";
import { useEffect, useState } from "react";
import { getAllRankingInfo } from "../pages/api/Ranking";

const data1 = [
  {
    src: testPhoto1.src,
    likeCount: 100,
    name: "test1",
  },
  {
    src: testPhoto1.src,
    likeCount: 76,
    name: "test long string",
  },
  {
    src: testPhoto1.src,
    likeCount: 75,
    name: "test long string 3",
  },
  {
    src: testPhoto1.src,
    likeCount: 80,
    name: "test long string 5",
  },
  {
    src: testPhoto1.src,
    likeCount: 90,
    name: "test long string 8",
  },
];

const data2 = [
  {
    src: testPhoto1.src,
    downloadCount: 131,
    name: "test1",
  },
  {
    src: testPhoto1.src,
    downloadCount: 20,
    name: "test long string",
  },
  {
    src: testPhoto1.src,
    downloadCount: 75,
    name: "test long string 3",
  },
  {
    src: testPhoto1.src,
    downloadCount: 80,
    name: "test long string 5",
  },
  {
    src: testPhoto1.src,
    downloadCount: 90,
    name: "test long string 8",
  },
];

export const RankingPage = () => {
  const [memeLikeData, setMemeLikeData] = useState([] as Array<any>);
  const [memeDownloadData, setMemeDownloadData] = useState([] as Array<any>);
  const [userCount, setUserCount] = useState([] as Array<any>);
  const [userPoints, setUserPoints] = useState([] as Array<any>);

  useEffect(() => {
    const func = async () => {
      const res = await getAllRankingInfo();
      const data = res.data;
      setMemeLikeData(data[0]);
      setMemeDownloadData(data[1]);
      setUserCount(data[2]);
      setUserPoints(data[3]);
    };
    try {
      func();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div>
      <HeadBar></HeadBar>
      <div
        style={{
          paddingLeft: "10%",
          fontSize: 80,
          fontWeight: 500,
          fontFamily: "EB Garamond",
          marginTop: 120,
          alignContent: "center",
          alignItems: "center",
          display: "flex",
          lineHeight: "57%",
          marginBottom: 70,
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
            Check Out
          </span>
          <span style={{ marginLeft: 360 }}>Weekly Stars!</span>
        </span>
      </div>
      <div
        style={{
          color: "#757575",
          fontFamily: "montserrat",
          paddingLeft: "10%",
        }}
      >
        <div>View The Statistics of Popular Memes</div>
        <div>and Users For The Entire Website</div>
      </div>
      {memeLikeData.length ? (
        <RankingGraph
          data={memeLikeData}
          displayKey={"likeCount"}
        ></RankingGraph>
      ) : (
        <></>
      )}
      {memeDownloadData.length ? (
        <RankingGraph
          data={memeDownloadData}
          displayKey={"downloadCount"}
        ></RankingGraph>
      ) : (
        <></>
      )}

      {userCount.length ? (
        <RankingGraph data={userCount} displayKey={"memesCount"}></RankingGraph>
      ) : (
        <></>
      )}
      {userPoints.length ? (
        <RankingGraph
          data={userPoints}
          displayKey={"pointsCount"}
        ></RankingGraph>
      ) : (
        <></>
      )}
    </div>
  );
};
