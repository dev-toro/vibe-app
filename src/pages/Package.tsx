

import { useParams } from 'react-router-dom';
import { getPackageById } from '../services/packageService';
import { useContext } from 'react';
import { SelectedAssetContext } from '../components/Sidebar';
import { Sandbox } from '../components/ui/sandbox';
import { AppWindowIcon, CodeIcon, TerminalIcon } from 'lucide-react';

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
      <div className="flex flex-col items-center justify-center min-h-screen w-full">
        <h2 className="text-xl font-bold mb-2">{selectedAsset.name}</h2>
        <div className="w-full max-w-4xl">
          <Sandbox files={{ [selectedAsset.name + '.yaml']: { code: selectedAsset.yaml } }} />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">{pkg.name}</h2>
      <p className="mb-2 text-gray-500">ID: <span className="font-mono">{pkg.id}</span></p>
      <p>{pkg.description}</p>
    </div>
  );
}
