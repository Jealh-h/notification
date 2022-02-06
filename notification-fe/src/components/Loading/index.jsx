import { Spin } from "@douyinfe/semi-ui";
import React from "react";
import "./index.less";
export default function Loading() {
  return (
    <div className="loading-wrapper">
      <Spin size="large"></Spin>
      loading...
    </div>
  );
}
