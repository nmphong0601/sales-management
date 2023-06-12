const Button = ({ children, className, ...props }) => {
  return (
    <button className="bg-nmp-primary rounded-full p-2 w-full" {...props}>
      {children}
    </button>
  );
};

export default Button;
