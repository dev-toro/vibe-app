

import { useParams } from 'react-router-dom';
import { getPackageById } from '../services/packageService';
import { useContext } from 'react';
import { SelectedAssetContext, ActiveTabContext } from '../components/Sidebar';
import { Renderer } from '../components/Renderer';

export default function PackageDetail() {
  const { id } = useParams<{ id: string }>();
  const pkg = id ? getPackageById(id) : undefined;
  const { selectedAsset } = useContext(SelectedAssetContext);
  const { activeTab } = useContext(ActiveTabContext);
  if (!pkg) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Package Not Found</h2>
        <p>No package found for id: <span className="font-mono">{id}</span></p>
      </div>
    );
  }
  return <Renderer pkg={pkg} selectedAsset={selectedAsset} activeTab={activeTab} />;
}
