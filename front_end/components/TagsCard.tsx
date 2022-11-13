import { IoCloseOutline } from "react-icons/io5";
import { useRef } from "react";
export const TagsCard = (props: { tagName: string; handleRemove: any }) => {
  const { tagName, handleRemove } = props;
  const spanRef = useRef(null);
  return (
    <div
      style={{
        width: "fit-content",
        borderRadius: 10,
        backgroundColor: "rgb(220, 220, 220)",
        fontSize: 10,
        fontFamily: "montserrat",
        marginRight: 15,
      }}
    >
      <div
        style={{
          display: "flex",
          paddingRight: 17,
          paddingLeft: 12,
          paddingTop: 1,
          paddingBottom: 1,
        }}
      >
        <span
          style={{
            fontSize: 12,
            paddingRight: 7,
            marginTop: 2,
            cursor: "pointer",
            zIndex: 100,
          }}
          onClick={() => handleRemove(spanRef)}
        >
          <IoCloseOutline title={tagName} key={tagName} />
        </span>
        <span ref={spanRef}>{tagName}</span>
      </div>
    </div>
  );
};
