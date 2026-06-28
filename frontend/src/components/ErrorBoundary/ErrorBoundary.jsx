import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
        console.error("ErrorBoundary caught:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', color: 'red', background: '#1a1a1a', minHeight: '100vh' }}>
                    <h2>Something went wrong on this page:</h2>
                    <pre style={{ marginTop: '10px', whiteSpace: 'pre-wrap', color: '#ff6b6b' }}>
                        {this.state.error && this.state.error.toString()}
                    </pre>
                    <pre style={{ marginTop: '10px', whiteSpace: 'pre-wrap', color: '#ffa0a0', fontSize: '12px' }}>
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </pre>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
