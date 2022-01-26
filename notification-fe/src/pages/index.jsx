import React from "react";
import {
  Notification,
  Typography,
  Row,
  Col,
  Timeline,
  Calendar,
  Modal,
  Card,
  Button,
  ButtonGroup,
  Tag,
  Popover,
  Spin,
  Input,
  Layout,
  Dropdown,
  Avatar,
} from "@douyinfe/semi-ui";
import {
  IconTick,
  IconEmoji,
  IconPlus,
  IconBell,
  IconChevronLeft,
  IconChevronRight,
  IconSearch,
  IconGithubLogo,
} from "@douyinfe/semi-icons";
import Header from "../components/Header/index";
import NoteEditor from "../components/NoteEditor/index";
import ModalContext from "../layout/context";
import MyEmpty from "../components/Empty";
import CoButton from "../components/Button/index";
import { isLogin } from "../util/util";

import "./index.css";
import "./index.less";
const { Title, Text } = Typography;
const { Content } = Layout;

const statusMap = {
  finish: {
    icon: <IconTick size="small" style={{ color: "#63B963" }} />,
    tip: "已完成",
  },
  underway: {
    icon: <Spin size="small"></Spin>,
    tip: "进行中",
  },
};

class Main extends React.Component {
  static contextType = ModalContext;
  constructor(props) {
    super(props);
    this.opt = {
      title: "你好,HHD",
      content: "welcomme to the notification",
      duration: 3,
      position: "top",
      icon: <IconEmoji />,
    };
    this.state = {
      currentDate: new Date(),
      taskList: [
        {
          title: "做计网作业做计网作业",
          date: "2021-12-31 15:30",
          descrption: "请务必完成啊了✨",
          status: "finish",
        },
        {
          title: "做计网作业",
          date: "2021-12-31 15:30",
          descrption: "请务必完成啊了✨",
          status: "underway",
        },
      ],
    };
  }
  componentDidMount() {
    Notification.info({ ...this.opt });
    // TODO
    console.log("--props---", this.props);
    console.log("--context---", this.context);
    if (isLogin()) {
      // this.props.user.getUserInfo();
    }
  }
  // 处理更新/添加
  componentDidUpdate(preProps, preState) {
    if (this.context.isUpdate) {
      console.log("main更新:", this.State, preState);
      this.context.toggleUpdateState();
    }
  }
  renderDot = () => {
    return <div style={{ marginRight: "3.5em" }}>😂</div>;
  };
  renderDateGrid = (dateString, date) => {
    const importantDate = {
      position: "absolute",
      left: "0",
      right: "0",
      top: "0",
      bottom: "0",
      cursor: "pointer",
      backgroundColor: "var(--semi-color-danger-light-default)",
    };
    const now = new Date();
    if (
      now.getDate() === date.getDate() &&
      now.getFullYear() === date.getFullYear() &&
      now.getMonth() === date.getMonth()
    ) {
      return (
        <Popover
          position="right"
          content={
            <article style={{ padding: 12 }}>
              Hi ByteDancer, this is a popover.
              <br /> We have 2 lines.
            </article>
          }
        >
          <div style={importantDate}>
            <div
              style={{
                width: "5px",
                height: "5px",
                backgroundColor: "red",
                position: "absolute",
                top: "50%",
              }}
            ></div>
          </div>
        </Popover>
      );
    }
    return null;
  };
  changeChooseDate = (identify) => {
    const month = this.state.currentDate.getMonth() + identify;
    let year = this.state.currentDate.getFullYear();
    if (month === 12) {
      year += 1;
    }
    /**
     * 不用考虑月份为负数，年份减一的情况，在 new Date时会自动让年份减一
     */
    // if (month === -1) {
    //   year -= 1;
    //   month = 1
    // }
    const newDate = new Date(year, month % 12, 1);
    this.setState({
      currentDate: newDate,
    });
  };
  handleSearch = (e) => {
    if (e.code === "Enter") {
      // TODO 发送请求
    }
  };
  upDateTaskList = () => {};
  rendTaskList = () => {
    return (
      <>
        <Title heading={3}>当前需要完成的事情</Title>
        <Timeline>
          {this.state.taskList.map((item, index) => {
            return (
              <Timeline.Item
                extra={item.descrption}
                key={index}
                time={"deadline：" + item.date}
              >
                {item.title}
                <div className="time-indicator">
                  {statusMap[item.status].icon}
                  {statusMap[item.status].tip}
                </div>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </>
    );
  };
  addTodo = () => {
    // TODO
    // 判断是否登录
    const id = localStorage.getItem("id");
    // if (!id) {
    //   Notification.warning({ content: "请先登录" });
    //   return;
    // }
    this.context.toggleVisible();
  };
  test = () => {
    const { userStore, taskStore } = this.context.store;
    userStore.getUserinfo();
  };
  render() {
    let contextValue = this.context;
    const { userStore, taskStore } = this.context.store;
    return (
      <>
        <Header
          title={<Button onClick={this.test}>测试</Button>}
          extral={
            isLogin() ? (
              <Dropdown
                trigger={"hover"}
                position={"bottomLeft"}
                render={
                  <Dropdown.Menu>
                    <Dropdown.Item>退出登录</Dropdown.Item>
                  </Dropdown.Menu>
                }
              >
                <Avatar
                  size="small"
                  src="https://sf6-cdn-tos.douyinstatic.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/avatarDemo.jpeg"
                  style={{ margin: 4 }}
                ></Avatar>
                <Text strong type="tertiary">
                  {userStore.userinfo.name}
                </Text>
              </Dropdown>
            ) : (
              <CoButton
                type="primary"
                size="middle"
                style={{ float: "right", margin: "5px 40px 0 0" }}
                onClick={contextValue.toggleLoginVisible}
              >
                登录
              </CoButton>
            )
          }
        ></Header>
        <Row>
          <Col lg={24} md={24}>
            <Row>
              <Col style={{ padding: "0 100px" }} lg={8} sm={24}>
                {this.state.taskList.length ? (
                  this.rendTaskList()
                ) : (
                  <>
                    <Input
                      placeholder={"输入邮件看看自己的事情吧"}
                      onKeyDown={this.handleSearch}
                      suffix={<IconSearch />}
                    ></Input>
                    <MyEmpty></MyEmpty>
                  </>
                )}
              </Col>
              {/* 日历 */}
              <Col lg={14}>
                <Card
                  title={"月视图"}
                  headerExtraContent={
                    <ButtonGroup>
                      <Button
                        onClick={() => this.changeChooseDate(-1)}
                        icon={<IconChevronLeft />}
                      ></Button>
                      <Button>
                        <Text
                          strong
                        >{`${this.state.currentDate.getFullYear()}年${
                          this.state.currentDate.getMonth() + 1
                        }月`}</Text>
                      </Button>
                      <Button
                        onClick={() => this.changeChooseDate(1)}
                        icon={<IconChevronRight />}
                      ></Button>
                    </ButtonGroup>
                  }
                >
                  <Calendar
                    mode="month"
                    displayValue={this.state.currentDate}
                    dateGridRender={this.renderDateGrid}
                  ></Calendar>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* 添加提示模态框 */}
        <Modal
          visible={contextValue.visible}
          onCancel={contextValue.toggleVisible}
          title={
            <div>
              添加提醒
              <IconBell />
            </div>
          }
          footer={null}
          size="small"
        >
          <NoteEditor upDate={this.upDateTaskList} />
        </Modal>
        {/* 登录框 */}
        <Modal
          header={null}
          footer={null}
          onCancel={contextValue.toggleLoginVisible}
          visible={contextValue.loginVisble}
        >
          <h3 style={{ textAlign: "center", fontSize: 24, margin: 40 }}>
            login
          </h3>
          <Content
            className="login-modal-content"
            style={{ textAlign: "center" }}
          >
            <div className="gh-login-entry">
              <a href="http://localhost:3003/api/user/gh-login">
                <IconGithubLogo size="extra-large" />
              </a>
            </div>
            <Text type="quaternary">请使用GitHub账号登录</Text>
          </Content>
        </Modal>
        <CoButton
          type="primary"
          size="middle"
          className="float-btn"
          style={{ position: "fixed", bottom: "20px", left: "20px" }}
          onClick={this.addTodo}
        >
          <IconPlus />
          添加
        </CoButton>
      </>
    );
  }
}
export default Main;
