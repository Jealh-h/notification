import React from "react";
import { Typography } from "@douyinfe/semi-ui";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: "",
    };
  }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true, error: info });
    // You can also log the error to an error reporting service
  }
  render() {
    return (
      <>
        {this.state.hasError ? (
          <>
            <Typography.Title>
              Sorry here are some thing wrong 😭
            </Typography.Title>
            <Typography.Paragraph>
              Here is the ErrorInfo
              {this.state.error}
            </Typography.Paragraph>
          </>
        ) : (
          this.props.children
        )}
      </>
    );
  }
}
