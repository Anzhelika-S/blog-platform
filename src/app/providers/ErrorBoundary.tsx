import { Alert, AlertTitle } from "@mui/material";
import React from "react";
import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
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
