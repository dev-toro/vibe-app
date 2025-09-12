import { Link, useLocation, matchPath } from 'react-router-dom';

const BREADCRUMB_MAP: Record<string, string> = {
  '/listing': 'Listing',
  '/package/:id': 'Package',
};

function getBreadcrumbs(pathname: string) {
  if (pathname === '/') return [{ name: 'Listing', path: '/listing' }];
  if (pathname.startsWith('/package/')) {
    return [
      { name: 'Listing', path: '/listing' },
      { name: 'Package', path: pathname },
    ];
  }
  return [{ name: 'Listing', path: '/listing' }];
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
              {crumb.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
