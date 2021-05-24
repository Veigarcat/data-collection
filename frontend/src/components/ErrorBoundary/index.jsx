import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    console.log('errror boundary', this.state.hasError);
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.hasError) {
      return <h1>Some thing went wrong</h1>;
    }
    // eslint-disable-next-line react/destructuring-assignment
    return this.props.children;
  }
}
