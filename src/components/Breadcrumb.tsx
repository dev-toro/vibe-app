import { Link, useLocation, matchPath } from 'react-router-dom';
import { Home } from 'lucide-react';

const BREADCRUMB_MAP: Record<string, string> = {
  '/listing': 'Workbench',
  '/package/:id': 'Package',
};

function getBreadcrumbs(pathname: string) {
  if (pathname === '/') return [{ name: 'Workbench', path: '/listing' }];
  if (pathname.startsWith('/package/')) {
    return [
      { name: 'Workbench', path: '/listing' },
      { name: 'Package', path: pathname },
    ];
  }
  return [{ name: 'Workbench', path: '/listing' }];
}

export default function Breadcrumb() {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);
  return (
    <nav className="text-sm mb-4" aria-label="Breadcrumb">
      <ol className="list-reset flex text-gray-500">
        {breadcrumbs.map((crumb, idx) => (
          <li key={crumb.path} className="flex items-center">
            {idx > 0 && <span className="mx-2">/</span>}
            <Link
              to={crumb.path}
              className={
                idx === breadcrumbs.length - 1
                  ? 'text-gray-900 font-semibold pointer-events-none'
                  : 'hover:underline text-blue-600'
              }
            >
              {idx === 0 && <Home className="inline-block w-4 h-4 mr-1 -mt-0.5 align-middle" aria-label="Home" />} {crumb.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
