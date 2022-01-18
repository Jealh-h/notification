import React from "react";
import { Empty, Row, Button, Typography } from "@douyinfe/semi-ui";
import { IllustrationNoContent } from "@douyinfe/semi-illustrations";
import ShowAddModalContext from "../../layout/context";
/* 以下为 1.13.0 版本后提供 */
import { IllustrationNoContentDark } from "@douyinfe/semi-illustrations";

function MyEmpty(props) {
  const context = React.useContext(ShowAddModalContext);
  const emptyStyle = {
    padding: 30,
  };
  return (
    <Empty
      image={<IllustrationNoContent style={{ width: 150, height: 150 }} />}
      darkModeImage={
        <IllustrationNoContentDark style={{ width: 150, height: 150 }} />
      }
      description={
        <>
          <Row>
            <Button onClick={context.toggleVisible}>添加</Button>
          </Row>
          <Row>
            <Typography.Text strong>暂无内容，请添加</Typography.Text>
          </Row>
        </>
      }
      style={emptyStyle}
    />
  );
}
export default MyEmpty;
