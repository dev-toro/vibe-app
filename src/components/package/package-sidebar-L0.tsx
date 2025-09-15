import { Button } from '../ui/button';
import type { AssetType } from '../../services/packageService';
import { L1_GROUPS } from './package-sidebar';

export function PackageSidebarL0({ activeTab, setActiveTab, pkg, flattenAssetsByType }: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pkg: any;
  flattenAssetsByType: (pkg: any, type: AssetType) => any[];
}) {
  return (
    <nav className="flex flex-col items-center py-2 px-0 gap-0.5 w-12 border-r border-gray-200 h-full">
      {/* Browse always on top */}
      <Button
        key="browse"
        variant="ghost"
        size="icon"
        className={`my-1 w-8 h-8 rounded-sm border transition-all flex items-center justify-center ${activeTab === 'browse' ? 'border-black text-black shadow-[0_2px_8px_0_rgba(0,0,0,0.03)] ' : 'border-transparent text-gray-700 hover:bg-gray-100 hover:text-black'} mt-1`}
        onClick={() => setActiveTab('browse')}
        style={activeTab === 'browse' ? { boxShadow: '0 0 0 2px #222, 0 2px 8px 0 rgba(0,0,0,0.03)' } : {}}
      >
        {L1_GROUPS[0].icon}
        <span className="sr-only">Browse</span>
      </Button>
      {/* Render a button for each asset type except 'browse' */}
      {L1_GROUPS.filter(t => t.key !== 'browse').map((item) => {
        const assetTypes = item.assetTypes || [item.key as AssetType];
        const hasAssets = assetTypes.some(type => flattenAssetsByType(pkg, type).length > 0);
        return (
          <Button
            key={item.key}
            variant="ghost"
            size="icon"
            className={`my-1 w-8 h-8 rounded-sm border transition-all flex items-center justify-center ${activeTab === item.key ? 'border-black text-black shadow-[0_2px_8px_0_rgba(0,0,0,0.03)]' : 'border-transparent text-gray-700 hover:bg-gray-100 hover:text-black'} ${!hasAssets ? 'opacity-40 pointer-events-none' : ''}`}
            onClick={() => setActiveTab(item.key)}
            style={activeTab === item.key ? { boxShadow: '0 0 0 2px #222, 0 2px 8px 0 rgba(0,0,0,0.03)' } : {}}
            disabled={!hasAssets}
          >
            {item.icon}
            <span className="sr-only">{item.label}</span>
          </Button>
        );
      })}
    </nav>
  );
}
