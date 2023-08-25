import { Link, useLocation } from 'react-router-dom'
import { config } from '../App'
import { cn } from '../utils/tailwind'

const MainNav = () => {
  const { pathname } = useLocation()

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">App</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {[
            { label: 'Generator', to: config.paths.generator },
            { label: 'Table', to: config.paths.table }
          ].map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className={cn(
                'transition-colors hover:text-black/80',
                pathname.startsWith(to) ? 'text-black' : 'text-black/50'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex-end flex items-center gap-4">
        <button
          onClick={() => {
            window.location.href = config.paths.signIn
            window.localStorage.clear()
          }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default MainNav
