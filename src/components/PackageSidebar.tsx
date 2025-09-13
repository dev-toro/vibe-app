import * as React from 'react';
import { Box } from 'lucide-react';
import { getPackageById } from '../services/packageService';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { SelectedAssetContext } from './Sidebar';

export default function PackageSidebar() {
  const location = useLocation();
  const { selectedAsset, setSelectedAsset } = useContext(SelectedAssetContext);
  const match = location.pathname.match(/^\/package\/(.+)$/);
  if (!match) return null;
  const packageId = match[1];
  const pkg = getPackageById(packageId);
  // Support both folders and flat assets for backward compatibility
  const folders = pkg?.folders || [];
  const assets = pkg?.assets || [];
  return (
    <aside className="h-screen w-60 bg-[#f4f5f7] flex flex-col py-6 px-3 shadow-sm">
      <div className="mb-2 mt-4 px-2 text-[11px] font-bold text-gray-500 tracking-widest">ASSETS</div>
      <div className="flex flex-col gap-1 mb-6">
        {folders.length > 0 ? (
          folders.map(folder => (
            <div key={folder.id} className="mb-2">
              <div className="text-xs font-semibold text-gray-600 px-2 mb-1">{folder.name}</div>
              {folder.assets.map(asset => (
                <button
                  key={asset.id}
                  className={`w-full flex items-center gap-3 px-3 py-1 text-[15px] rounded-lg text-blue-900 hover:bg-[#e9eaf0] font-normal transition-colors ${selectedAsset?.id === asset.id ? 'bg-blue-100' : ''}`}
                  onClick={() => setSelectedAsset(asset)}
                >
                  <Box className="w-4 h-4 text-blue-500" />
                  <span>{asset.name}</span>
                </button>
              ))}
            </div>
          ))
        ) : assets.length > 0 ? (
          assets.map(asset => (
            <button
              key={asset.id}
              className={`w-full flex items-center gap-3 px-3 py-1 text-[15px] rounded-lg text-blue-900 hover:bg-[#e9eaf0] font-normal transition-colors ${selectedAsset?.id === asset.id ? 'bg-blue-100' : ''}`}
              onClick={() => setSelectedAsset(asset)}
            >
              <Box className="w-4 h-4 text-blue-500" />
              <span>{asset.name}</span>
            </button>
          ))
        ) : (
          <div className="text-xs text-gray-400 px-3">No assets</div>
        )}
      </div>
    </aside>
  );
}
