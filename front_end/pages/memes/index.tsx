import HeadBar from "../../components/Header";
require("typeface-eb-garamond");

export const MemePage = () => {
  return (
    <div>
      <HeadBar></HeadBar>
      <div
        style={{
          paddingRight: 70,
          paddingLeft: 20,
          fontSize: 50,
          fontWeight: 500,
          fontFamily: "EB Garamond",
        }}
      >
        Find Memes You Want!
      </div>
    </div>
  );
};

export default MemePage;
