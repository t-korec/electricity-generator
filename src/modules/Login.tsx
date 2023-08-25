import { useForm } from 'react-hook-form';
import { config } from '../App';
import { useState } from 'react';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

const serverValidateUserSchema = z.object({
  status: z.number(),
  description: z.string(),
});

export type ValidateUserResponse = z.infer<typeof serverValidateUserSchema>;

export interface LoginForm {
  email: string;
  password: string;
}

const ServerStatusCodes = {
  Authorized: 1,
  InvalidToken: 11,
  InvalidUser: 8,
  InvalidPassword: 9,
} as const;

type ServerStatusCode =
  (typeof ServerStatusCodes)[keyof typeof ServerStatusCodes];

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const [serverError, setServerError] = useState<ValidateUserResponse>();

  const handleRegistration = async (formData: LoginForm) => {
    const headersList = {
      accept: 'text/plain',
    };

    const response = await fetch(
      `${config.url}/User/ValidateUser?token=${config.apiToken}&email=${formData.email}&password=${formData.password}`,
      {
        method: 'GET',
        headers: headersList,
      },
    );

    const serverResponse = serverValidateUserSchema.safeParse(
      await response.json(),
    );

    if (!serverResponse.success) {
      const { errors } = serverResponse.error;
      console.error(errors);
      return;
    }

    console.log(serverResponse.data);
    setServerError(serverResponse.data);
    if (serverResponse.data.status === ServerStatusCodes.Authorized) {
      window.localStorage.setItem(config.localStorage.authKey, 'true');
      navigate(config.paths.generator);
    }
  };

  const registerOptions = {
    email: {
      required: 'Email is required',
      validate: {
        matchPattern: (v: string) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'Email address must be a valid address',
      },
    },
    password: {
      required: 'Password is required',
      validate: {
        minLength: (v: string) =>
          v.length > 4 || 'The password should have at least 5 characters',
      },
    },
  };

  return (
    <div
      onSubmit={handleSubmit(handleRegistration)}
      className="w-[30rem] rounded-xl border border-gray-50 p-20 shadow-xl"
    >
      <form className="mb-4 grid gap-2">
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-white">
            Email *
          </label>
          <input
            className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            type="text"
            {...register('email', registerOptions.email)}
          />
          <small className="text-red-500">
            {errors?.email && errors.email.message}
          </small>
        </div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          Password *
        </label>
        <div>
          <input
            className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
            id="password"
            type="password"
            placeholder="*****"
            {...register('password', registerOptions.password)}
          />
          <small className="text-red-500">
            {errors?.password && errors.password.message}
          </small>
        </div>
        {serverError &&
          (serverError.status === ServerStatusCodes.InvalidUser ||
            serverError.status === ServerStatusCodes.InvalidToken) && (
            <div className="my-2 rounded-lg border-2 border-red-500 text-center text-red-500">
              <small className="">{serverError.description}</small>
            </div>
          )}
        <button
          type="submit"
          className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 rounded-lg bg-[#10BFFC] px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
        >
          Sign In
        </button>
        <a className="pt-2 align-baseline text-sm font-bold">
          Don't have account?
        </a>
        <a className=" hover:text-sky-500" href={config.paths.register}>
          Register
        </a>
      </form>
    </div>
  );
};

export default Login;
