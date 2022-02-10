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
    this.setState({ hasError: true, error: info });
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error: error,
    };
  }
  render() {
    const { hasError } = this.state;
    return (
      <>
        {hasError ? (
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
