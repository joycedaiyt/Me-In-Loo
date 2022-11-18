import { ReportWindow } from "../../components/ReportWindow";
import { Button, IconButton, Alert, Card, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

export const ReportPage = () => {
  const [overHasReported, setHasReported] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "black",
        minWidth: "100vw",
        alignItems: "center",
      }}
    >
      <ReportWindow
        overHasReported={overHasReported}
        setHasReported={setHasReported}
        reportSuccess={reportSuccess}
        setReportSuccess={setReportSuccess}
      />
      {overHasReported ? (
        <Snackbar
          open={overHasReported}
          autoHideDuration={6000}
          onClose={() => setHasReported(false)}
          style={{ marginLeft: "37%", marginBottom: 20 }}
        >
          <Alert
            severity="error"
            onClose={() => setHasReported(false)}
            sx={{ width: "100%", fontSize: 16 }}
          >
            Sorry, you can only report each post once.
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
      {reportSuccess ? (
        <Snackbar
          open={reportSuccess}
          autoHideDuration={6000}
          onClose={() => setReportSuccess(false)}
          style={{ marginLeft: "37%", marginBottom: 20 }}
        >
          <Alert
            onClose={() => setReportSuccess(false)}
            sx={{ width: "100%", fontSize: 16 }}
          >
            Your Report has been Received!
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}
    </div>
  );
};

export default ReportPage;
