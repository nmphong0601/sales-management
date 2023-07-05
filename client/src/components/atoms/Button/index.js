const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`bg-nmp-primary rounded-xl p-2 ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
