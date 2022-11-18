import { Paper, Button, TextField } from "@mui/material";
import { createReport } from "../pages/api/Report";
require("typeface-eb-garamond");
import "@fontsource/montserrat";
import { useRef, useState } from "react";
import Router from "next/router";

export const ReportWindow = (props: {
  overHasReported: boolean;
  setHasReported: any;
  reportSuccess: boolean;
  setReportSuccess: any;
}) => {
  const { overHasReported, setHasReported, reportSuccess, setReportSuccess } =
    props;
  const [reportDes, setReportDes] = useState("");
  const handleSubmit = async (el: any) => {
    try {
      let output = await createReport(
        Router.query["post_url"] as string,
        reportDes
      );
      setReportSuccess(true);
    } catch (e) {
      setHasReported(true);
    }
  };
  const handleChange = (el: any) => {
    setReportDes(el.target.value);
  };

  return (
    <div style={{ paddingTop: "8%", marginLeft: "35.8%" }}>
      <Paper
        elevation={3}
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          justifyContent: "left",
          fontFamily: "montserrat",
          borderRadius: 15,
          minHeight: 450,
          maxWidth: 500,
          zIndex: 10000,
          overflow: "scroll",
        }}
      >
        <div
          style={{
            justifyContent: "left",
            // alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {" "}
          <div
            style={{
              fontSize: 24,
              marginBottom: 16,
              marginTop: 50,
              marginLeft: "19%",
              //   marginRight: "20%",
            }}
          >
            Add Reasons for Reporting
          </div>
          <div
            style={{
              fontSize: 16,
              marginLeft: "9%",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            Report Description:
          </div>
          <TextField
            multiline
            minRows={6}
            maxRows={6}
            style={{ width: "80%", marginLeft: "9%" }}
            onChange={handleChange}
          ></TextField>
          <div>
            <Button
              style={{
                backgroundColor: "#80774f",
                color: "white",
                borderColor: "#80774f",
                borderWidth: "2px",
                borderRadius: 0,
                fontFamily: "montserrat",
                fontSize: "18px",
                fontWeight: 600,
                height: "40px",
                marginTop: 40,
                width: "50%",
                textTransform: "none",
                letterSpacing: 3,
                whiteSpace: "nowrap",
                marginLeft: "24%",
              }}
              onClick={handleSubmit}
            >
              {" "}
              SUBMIT
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};
