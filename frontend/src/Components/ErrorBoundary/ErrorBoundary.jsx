import { Typography } from "antd";
import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    console.log(error, info.componentStack);
  }

  render() {
    const { Title } = Typography;
    if (this.state.hasError) {
      return (
        <Title level={3}>
          Something went wrong, Please refresh. We will be back.
        </Title>
      );
    }

    return this.props.children;
  }
}
