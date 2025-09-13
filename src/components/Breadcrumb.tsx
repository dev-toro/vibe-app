
import * as React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Home } from 'lucide-react';
import { getPackageById } from '../services/packageService';
import { useContext } from 'react';
import { SelectedAssetContext } from './Sidebar';
import {
  Breadcrumb as ShadBreadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

function getBreadcrumbItems(pathname: string, packageName?: string, selectedAsset?: { name: string }) {
  if (pathname === '/') return [{ label: 'Workbench', href: '/listing', isCurrentPage: true }];
  if (pathname.startsWith('/package/')) {
    const items = [
      { label: 'Workbench', href: '/listing', isCurrentPage: false },
      { label: packageName || 'Package', href: pathname, isCurrentPage: !selectedAsset },
    ];
    if (selectedAsset) {
      items.push({ label: selectedAsset.name, href: '', isCurrentPage: true });
    }
    return items;
  }
  return [{ label: 'Workbench', href: '/listing', isCurrentPage: true }];
}

export default function Breadcrumb({ onBreadcrumbClick, showHomeIcon = true }: {
  onBreadcrumbClick?: (href: string) => void;
  showHomeIcon?: boolean;
} = {}) {
  const location = useLocation();
  const params = useParams();
  const ctx = useContext(SelectedAssetContext);
  const selectedAsset = ctx.selectedAsset ?? undefined;
  const setShowPackageHome = (ctx as any).setShowPackageHome;
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
                    if (index === 1 && setShowPackageHome) {
                      setShowPackageHome(true);
                    } else if (onBreadcrumbClick && item.href) {
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
