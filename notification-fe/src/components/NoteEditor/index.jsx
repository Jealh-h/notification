import React from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Popover,
  Notification,
} from "@douyinfe/semi-ui";
import { IconEmoji } from "@douyinfe/semi-icons";
import { validateEmailRule } from "../../util/util";
import ExpressionPanel from "../Expressions";
import ModalContext from "../../layout/context";
import "./index.css";
import { connect } from "../../util/hoc";
import notification from "../../models/notification";
import PropTypes from "prop-types";
class NoteEditor extends React.Component {
  static contextType = ModalContext;
  constructor(props) {
    super(props);
    this.formRef = React.createRef(null);
    this.state = {
      title: "",
      textAreaValue: "",
      expressionVisible: false,
    };
  }
  componentDidMount() {
    // this.props.addNotification();
  }
  setTitle = (value) => {
    this.setState({
      title: value,
    });
  };
  handleExpressionClick = (item) => {
    let form = this.formRef.current;
    let oldTextAreaValue = form.formApi.getValue("description");
    oldTextAreaValue = oldTextAreaValue ?? "";
    form.formApi.setValue("description", oldTextAreaValue.concat(item));
    this.toggleExpressionVisible();
  };
  toggleExpressionVisible = () => {
    this.setState((state) => ({
      expressionVisible: !state.expressionVisible,
    }));
  };
  // 提交申请
  handleFormSubmit = () => {
    const form = this.formRef.current;
    const { values, errors } = form.formApi.getFormState();
    console.log("表单数据:", Object.values(values), Object.values(errors));
    if (!Object.values(values).length || Object.values(errors).length) {
      Notification.error({ content: "请校验表单内容" });
      return;
    }
    // TODO
    // this.props.addNotification(values);
    // 关闭编辑框
    this.context.toggleVisible();
    // 修改状态为可以更新状态
    this.context.toggleUpdateState();
  };
  disabledDate = (date) => {
    const ddl = new Date();
    return date.getTime() < ddl.getTime();
  };
  render() {
    const iconColor = {
      color: "#bfbfbf",
    };
    return (
      <div
        className="note-editor"
        style={{ height: this.props.height, width: this.props.height }}
      >
        <div className="editor-info">
          <Form layout="horizontal" ref={this.formRef}>
            <Row>
              <Col span={11}>
                <Form.Input
                  field="title"
                  onChange={(v, e) => this.setTitle(v, e)}
                  suffix={`${this.state.title.length}/10`}
                  maxLength={10}
                  rules={{
                    required: true,
                    message: "请填写title",
                  }}
                />
              </Col>
              <Col span={11} offset={2}>
                <Form.Input
                  field="email"
                  rules={[
                    {
                      required: true,
                      message: "请填写邮件",
                    },
                    {
                      message: "请检查邮件格式",
                      validator: (rule, value) => {
                        return validateEmailRule(value);
                      },
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row style={{ margin: "10px 0" }}>
              <Col span={24}>
                <Form.DatePicker
                  field="DeadLine"
                  type="dateTime"
                  disabledDate={this.disabledDate}
                  rules={[{ required: true }]}
                ></Form.DatePicker>
              </Col>
            </Row>
            <Row style={{ margin: "0 0 10px" }}>
              <Col span={18}>
                <Form.Input
                  field="VerifyCode"
                  rules={[{ required: true }]}
                ></Form.Input>
              </Col>
              <Col span={4} offset={2}>
                <Button style={{ marginTop: "24px" }}>获取验证码</Button>
              </Col>
            </Row>
            {/* toolbar */}
            <Row style={{ width: "100%" }}>
              <div className="editor-content">
                <div className="editor-toolbar">
                  <Popover
                    visible={this.state.expressionVisible}
                    trigger="custom"
                    content={
                      <ExpressionPanel onClick={this.handleExpressionClick} />
                    }
                  >
                    <Button
                      onClick={this.toggleExpressionVisible}
                      icon={<IconEmoji style={iconColor} />}
                    />
                  </Popover>
                </div>
                <Form.TextArea
                  field="description"
                  label={{ text: "" }}
                  placeholder={"请输入待办描述"}
                  rows={3}
                  autosize
                  maxCount={50}
                />
              </div>
            </Row>
            <Row style={{ margin: "20px", textAlign: "right", width: "100%" }}>
              <Button onClick={this.context.toggleVisible}>取消</Button>
              <Button
                theme="solid"
                htmlType="submit"
                onClick={this.handleFormSubmit}
                style={{ marginLeft: "10px" }}
              >
                确定
              </Button>
            </Row>
          </Form>
        </div>
      </div>
    );
  }
}
NoteEditor.propTypes = {
  addNotification: PropTypes.func,
  upDate: PropTypes.func,
};
export default NoteEditor;
