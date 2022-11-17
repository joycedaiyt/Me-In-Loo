import { ReportWindow } from "../../components/ReportWindow";
import Router from "next/router";
export const ReportPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "black",
        minWidth: "100vw",
      }}
    >
      <ReportWindow></ReportWindow>
    </div>
  );
};

export default ReportPage;
