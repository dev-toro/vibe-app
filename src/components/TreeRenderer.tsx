import * as React from 'react';
import { Box, Folder, ChevronDown, ChevronRight, MoreVertical, type LucideIcon } from 'lucide-react';
import type { AssetType } from '../services/packageService';

export type TreeNode = {
  id: string;
  name: string;
  type: 'folder' | 'asset';
  children?: TreeNode[];
  asset?: any;
};

type TreeRendererProps = {
  nodes: TreeNode[];
  expanded: { [id: string]: boolean };
  setExpanded: (cb: (prev: { [id: string]: boolean }) => { [id: string]: boolean }) => void;
  selectedAsset: any;
  setSelectedAsset: (asset: any) => void;
  assetTypeIcon: Record<AssetType, LucideIcon>;
  activeTab: string;
};

export function AssetTreeRenderer({ nodes, expanded, setExpanded, selectedAsset, setSelectedAsset, assetTypeIcon, activeTab }: TreeRendererProps) {
  function handleToggle(id: string) {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  }
  function renderTree(nodes: TreeNode[], depth = 0) {
    return nodes.map(node => {
      if (node.type === 'folder') {
        const isOpen = expanded[node.id] || false;
        return (
          <div key={node.id} className="ml-2">
            <button
              className="flex items-center gap-1 px-1 py-0.5 rounded hover:bg-gray-200 w-full"
              onClick={() => handleToggle(node.id)}
              type="button"
            >
              {isOpen ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
              <Folder className="w-4 h-4 text-blue-700 mr-1" />
              <span className="text-[15px] text-gray-800 font-medium">{node.name}</span>
            </button>
            {isOpen && node.children && node.children.length > 0 && (
              <div className="ml-4 border-l border-gray-200 pl-2">
                {renderTree(node.children, depth + 1)}
              </div>
            )}
          </div>
        );
      }
      let Icon = Box;
      if (node.asset?.type && assetTypeIcon[node.asset.type as AssetType]) {
        Icon = assetTypeIcon[node.asset.type as AssetType];
      }
      const handleAssetClick = (asset: any) => {
        if (activeTab === 'browse' && asset && typeof asset.id === 'string' && typeof asset.name === 'string' && typeof asset.yaml === 'string') {
          setSelectedAsset(asset);
        }
      };
      return (
        <button
          key={node.id}
          className={`group flex items-center gap-2 px-2 py-1 rounded-lg w-full text-[15px] text-blue-900 hover:bg-[#e9eaf0] font-normal transition-colors ${selectedAsset?.id === node.id ? 'bg-blue-100' : ''}`}
          onClick={() => handleAssetClick(node.asset)}
          disabled={activeTab !== 'browse'}
        >
          <Icon className="w-4 h-4 text-blue-500" />
          <span>{node.name}</span>
          <MoreVertical className="w-4 h-4 ml-auto text-gray-300 group-hover:text-gray-400" />
        </button>
      );
    });
  }
  return <>{renderTree(nodes)}</>;
}
