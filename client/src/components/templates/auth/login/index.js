import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from 'components/atoms/Button';
import Input from 'components/atoms/Input';

import { useDispatch, useSelector } from 'react-redux';
import { login } from 'actions/userActions';
import { useEffect } from 'react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfor);
  const {
    register,
    unregister,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [userInfo]);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

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
          <form
            className="flex flex-col gap-4 items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              placeholder="Username..."
              {...register('user_name', { required: true })}
            />
            <Input
              placeholder="Password..."
              {...register('password', { required: true })}
            />
            <Button type="submit">Login</Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
