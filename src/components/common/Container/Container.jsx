const Container = ({ children, className = '', as: Component = 'div' }) => {
  return (
    <Component
      className={['container mx-auto px-4 sm:px-6 lg:px-8', className].filter(Boolean).join(' ')}
    >
      {children}
    </Component>
  );
};

export default Container;
