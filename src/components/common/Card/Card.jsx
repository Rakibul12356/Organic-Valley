const Card = ({ children, title }) => {
  return (
    <article>
      {title && <h3>{title}</h3>}
      {children}
    </article>
  );
};

export default Card;
