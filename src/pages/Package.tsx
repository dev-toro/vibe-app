

import { useParams } from 'react-router-dom';
import { getPackageById } from '../services/packageService';
import { useContext } from 'react';
import { SelectedAssetContext } from '../components/Sidebar';
import { Sandbox } from '../components/ui/sandbox';
import { PackageHome } from '../components/PackageHome';

export default function PackageDetail() {
  const { id } = useParams<{ id: string }>();
  const pkg = id ? getPackageById(id) : undefined;
  const { selectedAsset } = useContext(SelectedAssetContext);
  if (!pkg) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Package Not Found</h2>
        <p>No package found for id: <span className="font-mono">{id}</span></p>
      </div>
    );
  }
  if (selectedAsset) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <Sandbox files={{ [selectedAsset.name + '.yaml']: { code: selectedAsset.yaml } }} />
      </div>
    );
  }
  return <PackageHome pkg={pkg} />;
}
