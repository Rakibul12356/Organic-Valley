const EmptyState = ({ title = 'No data found', description }) => {
  return (
    <div>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
};

export default EmptyState;
