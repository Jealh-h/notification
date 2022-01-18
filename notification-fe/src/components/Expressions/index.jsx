import React from "react";
import { Typography } from "@douyinfe/semi-ui";
import "./index.css";

function FixedNumber(num, digits) {
  let ori_str = num + "";
  if (ori_str.length < digits) {
    return (
      String(Math.pow(10, digits - ori_str.length)).split("1")[1] + ori_str
    );
  } else {
    return ori_str;
  }
}
const low = 300,
  high = 700;

export default function ExpressionPanel(props) {
  let rows = [];
  let expressions = [];
  const { onClick } = props;
  // 生成表情Unicode
  for (let i = low; i < high; i++) {
    expressions.push(String.fromCodePoint(`0x1f${FixedNumber(i, 3)}`));
  }
  function renderExpression() {
    let ten_elem = [];
    for (let i = 0; i < expressions.length; i++) {
      ten_elem.push(
        <span
          key={expressions[i]}
          onClick={() => {
            if (!onClick) {
              return;
            }
            onClick(expressions[i]);
          }}
          className="expression-item"
        >
          {expressions[i]}
        </span>
      );
      if (ten_elem.length == 10) {
        rows.push(
          <div key={Math.ceil(i / 10)} className="expressions-row">
            {ten_elem.map((item, index) => item)}
          </div>
        );
        ten_elem = [];
      }
    }
    return rows.map((item) => item);
  }
  return (
    <div className="expression-panel">
      <div className="expression-panel-title">Unicode Expression</div>
      <div className="expressions-container">{renderExpression()}</div>
    </div>
  );
}
