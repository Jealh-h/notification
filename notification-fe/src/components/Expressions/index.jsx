import React from "react";
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
  const rowCount = window.innerWidth <= 575 ? 5 : 10;
  // 生成表情Unicode
  for (let i = low; i < high; i++) {
    expressions.push(String.fromCodePoint(`0x1f${FixedNumber(i, 3)}`));
  }
  function renderExpression() {
    let row_elem = [];
    for (let i = 0; i < expressions.length; i++) {
      row_elem.push(
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
      if (row_elem.length == rowCount) {
        rows.push(
          <div key={Math.ceil(i / rowCount)} className="expressions-row">
            {row_elem.map((item, index) => item)}
          </div>
        );
        row_elem = [];
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
