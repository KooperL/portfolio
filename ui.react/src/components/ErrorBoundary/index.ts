import React from 'react'

class ErrorBoundary extends React.Component {
  state = {
    errorMessage: '',
  }

  static getDerivedStateFromError(error: any) {
    return { errorMessage: error.toString() }
  }

  logErrorToServices = console.log

  componentDidCatch(error, info) {
    this.logErrorToServices(error.toString(), info.componentStack)
  }

  render() {
    if (this.state.errorMessage) {
      return <p>{this.state.errorMessage}</p>
    }
    return this.props.children
  }
}

export default ErrorBoundary
