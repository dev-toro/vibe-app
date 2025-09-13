import { Link, useLocation, matchPath, useParams } from 'react-router-dom';
import { Home } from 'lucide-react';
import { getPackageById } from '../services/packageService';

const BREADCRUMB_MAP: Record<string, string> = {
  '/listing': 'Workbench',
  '/package/:id': 'Package',
};

function getBreadcrumbs(pathname: string, packageName?: string) {
  if (pathname === '/') return [{ name: 'Workbench', path: '/listing' }];
  if (pathname.startsWith('/package/')) {
    return [
      { name: 'Workbench', path: '/listing' },
      { name: packageName || 'Package', path: pathname },
    ];
  }
  return [{ name: 'Workbench', path: '/listing' }];
}

export default function Breadcrumb() {
  const location = useLocation();
  const params = useParams();
  let packageName: string | undefined = undefined;
  let id = params.id;
  // fallback: extract id from pathname if not in params
  if (!id && location.pathname.startsWith('/package/')) {
    const match = location.pathname.match(/^\/package\/(.+)$/);
    if (match) id = match[1];
  }
  if (location.pathname.startsWith('/package/') && id) {
    const pkg = getPackageById(id);
    packageName = pkg?.name || id;
  }
  const breadcrumbs = getBreadcrumbs(location.pathname, packageName);
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
