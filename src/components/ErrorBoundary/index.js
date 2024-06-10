import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = (error, errorInfo) => {
    console.error("Uncaught error:", error, errorInfo);
    setHasError(true);
  };

  useEffect(() => {
    const errorHandler = (event) => {
      handleError(event.error, event.errorInfo);
    };
    
    window.addEventListener("error", errorHandler);
    window.addEventListener("unhandledrejection", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
      window.removeEventListener("unhandledrejection", errorHandler);
    };
  }, []);

  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return children;
};

export default ErrorBoundary;
