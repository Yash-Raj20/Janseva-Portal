import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex justify-center items-center h-screen bg-[#F4FBF7]">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-lg animate-pulse">
            <h2 className="text-xl font-bold text-center">
              Janseva Portal <br />Something went wrong.
            </h2>
            <p className="text-sm text-center mt-2">
              Please try refreshing the page.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
