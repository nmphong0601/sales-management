const Input = (props) => {
  return (
    <div className="flex items-center bg-nmp-form p-1.5 px-2 rounded-full border border-solid border-nmp-line-dark focus-within:border-nmp-primary">
      <input className="w-full bg-transparent" placeholder={props.placeholder} />
    </div>
  );
};

export default Input;
