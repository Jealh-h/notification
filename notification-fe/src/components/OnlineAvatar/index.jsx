import React from "react";
import { Dropdown } from "@douyinfe/semi-ui";
import { IconExit } from "@douyinfe/semi-icons";

function OnlineAvatar(props) {
  function logOut() {
    console.log("退出登录");
  }
  return (
    <>
      <Dropdown
        trigger={"hover"}
        position={"bottom"}
        render={
          <Dropdown.Menu>
            <Dropdown.Item onClick={logOut} icon={<IconExit />}>
              退出登录
            </Dropdown.Item>
          </Dropdown.Menu>
        }
      ></Dropdown>
    </>
  );
}

export default OnlineAvatar;
