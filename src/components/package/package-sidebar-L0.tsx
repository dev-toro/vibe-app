
import type { AssetType } from '../../services/packageService';
import { L1_GROUPS } from './package-sidebar';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '../nav/sidebar';

export function PackageSidebarL0({ activeTab, setActiveTab, pkg, flattenAssetsByType }: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pkg: any;
  flattenAssetsByType: (pkg: any, type: AssetType) => any[];
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
      {/* Browse always on top */}
        <SidebarMenuItem key="browse">
          <SidebarMenuButton
            isActive={activeTab === 'browse'}
            onClick={() => setActiveTab('browse')}
            tooltip="Browse"
          >
            {L1_GROUPS[0].icon}
            <span className="sr-only">Browse</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      {/* Render a button for each asset type except 'browse' */}
      {L1_GROUPS.filter(t => t.key !== 'browse').map((item) => {
        const assetTypes = item.assetTypes || [item.key as AssetType];
        const hasAssets = assetTypes.some(type => flattenAssetsByType(pkg, type).length > 0);
        return (
            <SidebarMenuItem key={item.key}>
              <SidebarMenuButton
                isActive={activeTab === item.key}
                onClick={() => setActiveTab(item.key)}
                tooltip={item.label}
                disabled={!hasAssets}
              >
                {item.icon}
                <span className="sr-only">{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
        );
      })}
      </SidebarMenu>
    </SidebarGroup>

  );
}
