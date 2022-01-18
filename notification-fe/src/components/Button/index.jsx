import React from "react";
import "./index.css";

const typeMap = {
  danger: "co-button-danger",
  primary: "co-button-primary",
  link: "co-button-link",
  success: "co-button-success",
};
const sizeMap = {
  large: "co-button-large",
  middle: "co-button-middle",
  default: "co-button-default",
};

export default function CoButton(props) {
  const config = { ...props };
  const type = config.type ? typeMap[config.type] : typeMap["primary"];
  const size = config.size ? sizeMap[config.size] : sizeMap["default"];
  return (
    <>
      <button
        type={config?.type}
        className={`co-button co-button-default ${type} ${size}`}
        style={config?.style}
        onClick={config?.onClick}
      >
        <span className="co-button-content">{config.children}</span>
      </button>
    </>
  );
}
