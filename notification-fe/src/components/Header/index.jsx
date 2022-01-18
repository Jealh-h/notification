import React from "react";
import "./index.css";
import { IconPlus } from "@douyinfe/semi-icons";

export default function Header(props) {
  return (
    <div className="header-nav">
      <div className={"header-title"}>{props.title}</div>
      {props.content && (
        <div className={"header-inner-content"}>{props.content}</div>
      )}
      {props.extral && (
        <div className="header-inner-extral">{props.extral}</div>
      )}
    </div>
  );
}
