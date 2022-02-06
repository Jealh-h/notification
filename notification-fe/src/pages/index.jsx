import React from "react";
import { observer } from "mobx-react";
import {
  Typography,
  Row,
  Col,
  Timeline,
  Calendar,
  Modal,
  Card,
  Button,
  ButtonGroup,
  Popover,
  Spin,
  SideSheet,
  Layout,
  Dropdown,
  Avatar,
  Pagination,
  Notification,
  Switch,
  List,
} from "@douyinfe/semi-ui";
import { IllustrationIdle } from "@douyinfe/semi-illustrations";
import {
  IconTick,
  IconPlus,
  IconBell,
  IconChevronLeft,
  IconChevronRight,
  IconMoon,
  IconSun,
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
const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;
const colorLevel = [
  "var(--semi-color-danger-light-default)",
  "var(--semi-color-danger-light-active)",
  "var( --semi-color-warning)",
  "var(--semi-color-danger)",
  "var(--semi-color-danger-active)",
];
const importantDate = {
  position: "absolute",
  left: "0",
  right: "0",
  top: "0",
  bottom: "0",
  cursor: "pointer",
  backgroundColor: "var(--semi-color-danger-light-default)",
};
const statusMap = {
  success: {
    icon: <IconTick size="small" style={{ color: "#63B963" }} />,
    tip: "已完成",
  },
  ongoing: {
    icon: <Spin size="small"></Spin>,
    tip: "进行中",
  },
};
function setBg(count) {
  if (count < 2) return 0;
  else if (count < 5) return 1;
  else if (count < 8) return 2;
  else if (count < 12) return 3;
  else return 4;
}
class Main extends React.Component {
  static contextType = ModalContext;
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      taskList: [],
      visible: false,
      currentDayTask: [],
    };
  }
  componentDidMount() {
    const { userStore, taskStore, monthDataStore } = this.context.store;
    if (isLogin()) {
      // 获取用户信息
      monthDataStore.getMonthData();
      userStore.getUserinfo();
      taskStore.loadTasks();
      taskStore.getTotalNumber();
    } else {
      Notification.info({
        title: "请登录",
        position: "top",
      });
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
  // 渲染日期单元格
  renderDateGrid = (dateString, date) => {
    const { monthDataStore } = this.context.store;
    const day = date.getDate();
    const month = date.getMonth();
    const key = `${month}月${day}日`;
    if (monthDataStore.monthData[key] !== undefined) {
      let bgc = colorLevel[setBg(monthDataStore.monthData[key]?.length)];
      return (
        <Popover
          position="top"
          content={
            <article className="canlendar-cell-tip" style={{ padding: 12 }}>
              {`这一天有${monthDataStore.monthData[key]?.length}个事件`}
              <br />
              <div className="task-num-tip">点击查看详情</div>
            </article>
          }
        >
          <div
            style={{ ...importantDate, backgroundColor: bgc }}
            onClick={() =>
              this.handleSiderVisiable(monthDataStore.monthData[key])
            }
          ></div>
        </Popover>
      );
    }
    return null;
  };
  // 显示侧边栏
  handleSiderVisiable = (data) => {
    this.setState({
      visible: true,
      currentDayTask: data,
    });
  };
  // 渲染侧边栏内容
  rendSideSheetContent = () => {
    if (!this.state.currentDayTask.length) {
      return null;
    }
    return (
      <List
        dataSource={this.state.currentDayTask}
        renderItem={(item) => (
          <List.Item
            main={
              <div>
                <h4
                  style={{
                    color: "var(--semi-color-text-0)",
                    fontWeight: "bolder",
                  }}
                >
                  {item.title}
                </h4>
                {item.description}
                <div className="task-num-tip">
                  {new Date(item.deadline).toLocaleString()}
                </div>
              </div>
            }
          />
        )}
      ></List>
    );
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
  upDateTaskList = () => {};
  // 渲染task列表
  rendTaskList = () => {
    const { taskStore } = this.context.store;
    return (
      <>
        <Title heading={3}>当前需要完成的事情</Title>
        <Timeline>
          {taskStore.tasks.map((item, index) => {
            let time = new Date(item.deadline).toLocaleString();
            return (
              <Timeline.Item
                extra={item.descrption}
                key={index}
                type={item.status}
                time={"Deadline：" + time}
              >
                {item.title}
                <div className="time-indicator">
                  {statusMap[item.status].icon}
                  <div className="status-tip">{statusMap[item.status].tip}</div>
                </div>
              </Timeline.Item>
            );
          })}
        </Timeline>
        <Pagination
          total={taskStore.totalPage}
          size="small"
          onPageChange={(e) => taskStore.pageChange(e)}
          hoverShowPageSelect
        ></Pagination>
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
  // 日夜模式转换
  changeMode = () => {
    const body = document.body;
    if (body.hasAttribute("theme-mode")) {
      body.removeAttribute("theme-mode");
    } else {
      body.setAttribute("theme-mode", "dark");
    }
  };
  render() {
    let contextValue = this.context;
    const { userStore, taskStore } = this.context.store;
    return (
      <>
        <Header
          title={
            <Switch
              onChange={this.changeMode}
              checkedText={<IconMoon />}
              uncheckedText={<IconSun style={{ color: "#FBCD2C" }} />}
              style={{ marginLeft: 5 }}
            />
          }
          extral={
            isLogin() ? (
              <Dropdown
                trigger={"hover"}
                position={"bottomLeft"}
                render={
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={userStore.logout}>
                      退出登录
                    </Dropdown.Item>
                  </Dropdown.Menu>
                }
              >
                <Avatar
                  size="small"
                  src={userStore.userinfo?.avatar_url}
                  style={{ margin: 4 }}
                ></Avatar>
                <Text strong type="tertiary">
                  {userStore.userinfo?.name}
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
              <Col className="task-list" lg={8} sm={24}>
                {isLogin() ? (
                  taskStore.tasks.length ? (
                    this.rendTaskList()
                  ) : (
                    <>
                      <MyEmpty></MyEmpty>
                    </>
                  )
                ) : (
                  <div className="not-loggin">
                    <IllustrationIdle style={{ width: 150, height: 150 }} />
                    <Paragraph strong>
                      <Text
                        size="normal"
                        onClick={contextValue.toggleLoginVisible}
                        link
                      >
                        登录
                      </Text>
                      查看更多
                    </Paragraph>
                  </div>
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
        <SideSheet
          visible={this.state.visible}
          onCancel={() => {
            this.setState({ visible: !this.state.visible });
          }}
          // afterVisibleChange={this.handleSiderVisiable}
        >
          {this.rendSideSheetContent()}
        </SideSheet>
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
              <a href="http://localhost:3003/login/gh-login">
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
export default observer(Main);
