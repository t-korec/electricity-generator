import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { config } from '../App';

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
    <div className="w-full">
      <Outlet />
    </div>
  );
};

export default Private;
