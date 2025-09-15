import * as React from 'react';
import { Home } from 'lucide-react';
import { useLocation, useParams } from 'react-router-dom';
import { getPackageById } from '../../services/packageService';
import {
  Breadcrumb as ShadBreadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';

type BreadcrumbItem = { label: string; href: string; isCurrentPage: boolean };

function getBreadcrumbItems(pathname: string, packageName?: string, selectedAsset?: { name: string }): BreadcrumbItem[] {
  // Config for main sections, easy to extend
  const sections = [
    { match: /^\/?$/, label: 'Projects', href: '/projects' },
    { match: /^\/projects\/?$/, label: 'Projects', href: '/projects' },
    { match: /^\/playground\/?$/, label: 'Playground', href: '/playground' },
    { match: /^\/libraries\/?$/, label: 'Libraries', href: '/libraries' },
    { match: /^\/marketplace\/?$/, label: 'Marketplace', href: '/marketplace' },
    { match: /^\/runtimes\/?$/, label: 'Runtimes', href: '/runtimes' },
    { match: /^\/workloads\/?$/, label: 'Workloads', href: '/workloads' },
    { match: /^\/data-ingestion\/?$/, label: 'Data Ingestion', href: '/data-ingestion' },
    { match: /^\/package\//, label: 'Package', href: '' },
  ];

  // Find which section matches
  const section = sections.find(s => s.match.test(pathname));

  // / or /projects or any top-level section
  if (section && section.label !== 'Package') {
    return [{ label: section.label, href: section.href, isCurrentPage: true }];
  }

  // /package/:id or deeper
  if (pathname.startsWith('/package/')) {
    const items: BreadcrumbItem[] = [
      { label: 'Projects', href: '/projects', isCurrentPage: false },
      { label: packageName || 'Package', href: pathname, isCurrentPage: !selectedAsset },
    ];
    if (selectedAsset) {
      items.push({ label: selectedAsset.name, href: '', isCurrentPage: true });
    }
    return items;
  }

  // Default fallback
  return [{ label: 'Projects', href: '/projects', isCurrentPage: true }];
}

type AppHeaderBreadcrumbProps = {
  onBreadcrumbClick?: (href: string) => void;
  showHomeIcon?: boolean;
  selectedAsset?: { name: string };
};

export default function AppHeaderBreadcrumb({
  onBreadcrumbClick,
  showHomeIcon = true,
  selectedAsset
}: AppHeaderBreadcrumbProps = {}) {
  const location = useLocation();
  const params = useParams();
  let packageName: string | undefined = undefined;
  let id = params.id;
  if (!id && location.pathname.startsWith('/package/')) {
    const match = location.pathname.match(/^\/package\/(.+)$/);
    if (match) id = match[1];
  }
  if (location.pathname.startsWith('/package/') && id) {
    const pkg = getPackageById(id);
    packageName = pkg?.name || id;
  }
  const breadcrumbItems = getBreadcrumbItems(location.pathname, packageName, selectedAsset);
  return (
    <ShadBreadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {item.isCurrentPage ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href={item.href}
                  onClick={e => {
                    e.preventDefault();
                    if (onBreadcrumbClick && item.href) {
                      onBreadcrumbClick(item.href);
                    } else if (item.href) {
                      window.location.href = item.href;
                    }
                  }}
                  className="cursor-pointer"
                >
                  {index === 0 && showHomeIcon ? (
                    <>
                      <Home size={16} aria-hidden="true" />
                      <span className="sr-only">{item.label}</span>
                    </>
                  ) : (
                    item.label
                  )}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </ShadBreadcrumb>
  );
}
