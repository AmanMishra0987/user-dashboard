import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="alert alert-danger d-flex justify-content-between align-items-center" role="alert">
      <span>{message}</span>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-outline-light btn-sm">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;