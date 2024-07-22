import { CSSProperties } from "react";
import { BeatLoader } from "react-spinners";

function Loading() {
  const override: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: "rgba(255,255,255,0.5)",
    width: "100%",
    height: "100%",
    zIndex: 600,
  };

  return (
    <div style={override}>
      <BeatLoader
        color={"#29b6f6"}
        size={20}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />
    </div>
  );
}

export default Loading;
