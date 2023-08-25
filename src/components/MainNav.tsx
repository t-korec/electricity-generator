import { config } from '../App';
import { cn } from '../utils/tailwind';

const MainNav = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  return (
    <div className="flex w-full items-center justify-between">
      <ul className="flex flex-wrap border-gray-200">
        <li className="mr-2">
          <a
            onClick={() => {
              setActiveTab('tab1');
            }}
            aria-current="page"
            className={cn(
              'inline-block rounded-lg py-4 px-4 text-center text-sm font-medium ',
              activeTab === 'tab1' && 'active bg-gray-100 text-blue-600',
              activeTab !== 'tab1' &&
                'text-gray-500 hover:bg-gray-50 hover:text-gray-600',
            )}
          >
            Generator
          </a>
        </li>
        <li
          className="mr-2"
          onClick={() => {
            setActiveTab('tab2');
          }}
        >
          <a
            onClick={() => {
              setActiveTab('tab1');
            }}
            className={cn(
              'inline-block rounded-lg py-4 px-4 text-center text-sm font-medium ',
              activeTab === 'tab2' && 'active bg-gray-100 text-blue-600',
              activeTab !== 'tab2' &&
                'text-gray-500 hover:bg-gray-50 hover:text-gray-600',
            )}
          >
            Table
          </a>
        </li>
      </ul>

      <div className="flex-end flex items-center gap-4">
        <button
          onClick={() => {
            window.location.href = config.paths.signIn;
            window.localStorage.clear();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MainNav;
