import "@fontsource/montserrat";
import { TextField, Button } from "@mui/material";
export const UploadInfo = (props: {
  postName: string;
  setPostName: any;
  postCost: number;
  setPostCost: any;
  postTags: Array<string>;
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
  } = props;
  const handlePostName = (el: any) => {
    setPostName(el.target.value);
  };
  const handlePostCost = (el: any) => {
    setPostCost(el.target.value);
  };
  return (
    <div style={{ fontFamily: "montserrat", fontSize: 14 }}>
      <div style={{ display: "flex" }}>
        <span>
          <div style={{ marginBottom: 10 }}>Post Name *</div>
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
          />
        </span>
        <span style={{ marginLeft: 150 }}>
          <div style={{ marginBottom: 10 }}>Post Cost *</div>
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
          />
        </span>
      </div>
      <div>
        <Button>submit </Button>
      </div>
    </div>
  );
};
