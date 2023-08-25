import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { config } from '../App';

const Public = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const item = window.localStorage.getItem(config.localStorage.authKey);

    if (item && JSON.parse(item)) {
      navigate(config.paths.generator);
    }
  }, [navigate]);

  return (
    <div className="bg-light-100 flex h-screen w-screen items-center justify-center">
      <Outlet />
    </div>
  );
};

export default Public;
