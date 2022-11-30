require("typeface-eb-garamond");
import "@fontsource/montserrat";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Paper, Card } from "@mui/material";
import emptyProfilePhoto from "../public/empty_profile.png";

const color = ["#FBEB4F", "#000000"];

export const RankingGraph = (props: {
  data: Array<any>;
  displayKey: string;
}) => {
  const { data, displayKey } = props;
  const CustomImage = (props: any) => {
    const { payload, x, y } = props;
    return (
      <image
        x={x - 25}
        y={y}
        href={
          data[payload.index].src
            ? data[payload.index].src
            : emptyProfilePhoto.src
        }
        width="50"
        height="50"
      ></image>
    );
  };

  const CustomToolTip = (props: any) => {
    const { payload, activate } = props;
    if (payload && payload.length) {
      const data = payload[0].payload;
      if (displayKey == "memesCount") {
        return (
          <div
            style={{
              fontFamily: "montserrat",
              //   border: 0,
              backgroundColor: "white",
              fontSize: 11,
              maxWidth: 250,
            }}
          >
            <div style={{ padding: 10 }}> User Email: {data.name}</div>
            <div style={{ padding: 10 }}> Description: {data.description}</div>
            <div style={{ padding: 10 }}> Total Uploads: {data.memesCount}</div>
          </div>
        );
      } else if (displayKey == "pointsCount") {
        return (
          <div
            style={{
              fontFamily: "montserrat",
              //   border: 0,
              backgroundColor: "white",
              fontSize: 11,
              maxWidth: 250,
            }}
          >
            <div style={{ padding: 10 }}> User Email: {data.name}</div>
            <div style={{ padding: 10 }}> Description: {data.description}</div>
            <div style={{ padding: 10 }}> Total Points: {data.pointsCount}</div>
          </div>
        );
      } else if (displayKey == "likeCount") {
        return (
          <div
            style={{
              fontFamily: "montserrat",
              //   border: 0,
              backgroundColor: "white",
              fontSize: 11,
              maxWidth: 250,
            }}
          >
            <div style={{ padding: 10 }}> Meme Name: {data.name}</div>
            {/* <div style={{ padding: 10 }}> Description: {data.description}</div> */}
            <div style={{ padding: 10 }}> Total Liked: {data.likeCount}</div>
          </div>
        );
      } else {
        return (
          <div
            style={{
              fontFamily: "montserrat",
              //   border: 0,
              backgroundColor: "white",
              fontSize: 11,
              maxWidth: 250,
            }}
          >
            <div style={{ padding: 10 }}> Meme Name: {data.name}</div>
            {/* <div style={{ padding: 10 }}> Description: {data.description}</div> */}
            <div style={{ padding: 10 }}>
              {" "}
              Total Downloaded: {data.downloadCount}
            </div>
          </div>
        );
      }
    }
    return <></>;
  };
  return (
    <div style={{ paddingLeft: "10%" }}>
      {/* <div style={{ display: "flex" }}> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 70,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            maxWidth: 140,
            minWidth: 140,
            minHeight: 8,
            backgroundColor: "rgb(251, 235, 79)",
            marginRight: 30,
          }}
        ></div>
        <span
          style={{ fontFamily: "EB Garamond", fontSize: 30, marginTop: -5 }}
        >
          {" "}
          {displayKey == "likeCount"
            ? "Memes with Top 5 Like Count"
            : displayKey == "downloadCount"
            ? "Memes with Top 5 Download Count"
            : displayKey == "pointsCount"
            ? "Users with Top 5 total Points"
            : displayKey == "memesCount"
            ? "Users with Top 5 Uploaded Memes"
            : ""}
        </span>
      </div>
      <div style={{ marginRight: "40%", paddingBottom: 80 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            // width={600}
            // height={300}
            data={data}
            margin={{
              top: 20,
              //   right: 30,
              //   left: 20,
              bottom: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tick={<CustomImage />} />
            <YAxis />
            <Tooltip content={<CustomToolTip />} />
            {/* <Legend /> */}
            <Bar dataKey={displayKey} fill="#000000">
              {data.map((entry, index) => {
                return <Cell key={`cell-${index}`} fill={color[index % 2]} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
