import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';

const Login = () => {
  return (
    <section className="w-screen h-screen">
      <div className="relative container w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-nmp-dark-secondary rounded-md flex flex-col items-center p-4 px-6">
          <img
            src={'/assets/images/metalic-logo.png'}
            width={128}
            height={128}
            alt="metalic-logo"
          />
          <form className="flex flex-col gap-4 items-center">
            <Input placeholder="Username..." />
            <Input placeholder="Password..." />
            <Button type="submit">Login</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
