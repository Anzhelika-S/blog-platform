import { Alert, AlertTitle } from "@mui/material";
import { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    error: null,
  };
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    const { error } = this.state;

    if (error) {
      return (
        <Alert severity="error" sx={{ width: 300, margin: "50px auto", height: 100, alignItems: "center" }}>
          <AlertTitle>Error</AlertTitle>
          Looks like something went wrong, try again later
        </Alert>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
