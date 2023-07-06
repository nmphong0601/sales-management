import { forwardRef } from 'react';

const Input = ({ className, children, ...props }, ref) => {
  const { type } = props;

  switch (type) {
    case 'radio':
      return <Radio children {...props} />;
    case 'checkbox':
      return <CheckBox children {...props} />;
  }

  return (
    <div
      className={`flex items-center bg-nmp-form p-1.5 px-2 rounded-full border border-solid border-nmp-line-dark focus-within:border-nmp-primary ${
        className || ''
      }`}
    >
      <input
        ref={ref}
        className="w-full bg-transparent"
        {...props}
      />
      {children}
    </div>
  );
};

const CheckBox = ({ children, color, ...props }) => {
  return (
    <div className="inline-flex items-center">
      <label
        className="relative flex cursor-pointer items-center rounded-full p-3"
        data-ripple-dark="true"
      >
        <input
          type="checkbox"
          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
          {...props}
        />
        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </label>
    </div>
  );
};

const Radio = ({ children, color, ...props }) => {
  return (
    <div className="inline-flex items-center">
      <label className="relative flex cursor-pointer items-center rounded-full p-3">
        <input
          type="radio"
          className={`before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-green-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:before:bg-green-500 hover:before:opacity-10`}
          {...props}
        />
        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-green-500 opacity-0 transition-opacity peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
          </svg>
        </div>
      </label>
    </div>
  );
};

export default forwardRef(Input);
