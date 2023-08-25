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
      <header className="supports-backdrop-blur:bg-white/60 sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur">
        <div className="container flex h-14 items-center">
          <MainNav />
        </div>
      </header>
      <div className="flex-1">
        <div className="container flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Private;
