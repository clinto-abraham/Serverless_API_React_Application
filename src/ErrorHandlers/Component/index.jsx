import React from "react";
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: {},
            errorInfo: []
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.   
        return {
            hasError: true,
            error
        };
    }
    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service   
        console.log(errorInfo?.componentStack);
        return {
            errorInfo: errorInfo?.componentStack
        }
    }
    render() {
        if (this.state.hasError) {  
            return <>
                <h1 className="white">Something went wrong.</h1>
                <p className="white">{this.props.name}</p>
                <p className="white">{this.state.error?.message}</p>
                {this.state.errorInfo.map(state => <p className="white" key={state}>{state}</p>)}
                <p className="white">{this.state.error?.stack}</p>
            </>;
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.object,
    name: PropTypes.string
};

export default ErrorBoundary