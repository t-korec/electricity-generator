import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { config } from '../App';
import MainNav from '../components/MainNav';

const Private = () => {
  const navigate = useNavigate();
  const item = window.localStorage.getItem(config.localStorage.authKey);

  useEffect(() => {
    if (!item || !JSON.parse(item)) {
      navigate(config.paths.signIn);
    }
  }, [navigate]);

  if (!item || !JSON.parse(item)) {
    return null;
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col px-10">
      <div className="flex-1">
        <div className="container flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Private;
