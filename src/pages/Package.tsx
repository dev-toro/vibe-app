

import { useParams } from 'react-router-dom';
import { getPackageById } from '../services/packageService';

import * as React from 'react';
import PackageSidebar, { SelectedAssetContext, ActiveTabContext } from '../components/PackageSidebar';
import { PackageRenderer } from '../components/PackageRenderer';
import type { Asset } from '../services/packageService';


export default function PackageDetail() {
  const { id } = useParams<{ id: string }>();
  const pkg = id ? getPackageById(id) : undefined;
  const [selectedAsset, setSelectedAsset] = React.useState<Asset | null>(null);
  const [activeTab, setActiveTab] = React.useState('browse');
  if (!pkg) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Package Not Found</h2>
        <p>No package found for id: <span className="font-mono">{id}</span></p>
      </div>
    );
  }
  return (
    <SelectedAssetContext.Provider value={{ selectedAsset, setSelectedAsset }}>
      <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
        <div className="flex flex-col h-screen">

          <div className="flex flex-1">
            <PackageSidebar />
            <PackageRenderer pkg={pkg} selectedAsset={selectedAsset} activeTab={activeTab} />
          </div>
        </div>
      </ActiveTabContext.Provider>
    </SelectedAssetContext.Provider>
  );
}
