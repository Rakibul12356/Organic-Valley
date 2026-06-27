const ErrorState = ({ title = 'Something went wrong', message, onRetry }) => {
  return (
    <div role="alert">
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {onRetry && <button type="button" onClick={onRetry}>Retry</button>}
    </div>
  );
};

export default ErrorState;
