
import * as React from "react"
import * as lucideIcons from "lucide-react"
import { Box, ChevronRight, File, Folder, MoreVertical } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from "@/components/ui/sidebar"

// ...existing code...

// Props match AssetTreeRenderer
export function TreeSidebar({
  nodes = [],
  expanded = {},
  setExpanded = () => {},
  selectedAsset = null,
  setSelectedAsset = () => {},
  activeTab = 'browse',
  showChanges = false,
  changes = [],
}: {
  nodes: any[];
  expanded: { [id: string]: boolean };
  setExpanded: (cb: (prev: { [id: string]: boolean }) => { [id: string]: boolean }) => void;
  selectedAsset: any;
  setSelectedAsset: (asset: any) => void;
  activeTab: string;
  showChanges?: boolean;
  changes?: { file: string; state: string }[];
}) {
  function handleToggle(id: string) {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  }
  function renderTree(nodes: any[], depth = 0) {
    return nodes.map(node => {
      if (node.type === 'folder') {
        const isOpen = expanded[node.id] || false;
        return (
          <SidebarMenuItem key={node.id}>
            <Collapsible
                className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
            >
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                        onClick={() => handleToggle(node.id)}
                        type="button"
                        >
                        <ChevronRight className="transition-transform" />
                        <Folder/>
                        {node.name}
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>

            {isOpen && node.children && node.children.length > 0 && (
              <div className="ml-4 border-l border-gray-200 pl-2">
                {renderTree(node.children, depth + 1)}
              </div>
            )}

          </SidebarMenuItem>
        );
      }
      let Icon = Box;
      if (node.asset?.icon && typeof node.asset.icon === 'string' && (lucideIcons as any)[node.asset.icon]) {
        Icon = (lucideIcons as any)[node.asset.icon];
      } else {
        return Icon;
      }
// Remove duplicate import statement
      const handleAssetClick = (asset: any) => {
        if (activeTab === 'browse' && asset && typeof asset.id === 'string' && typeof asset.name === 'string' && typeof asset.yaml === 'string') {
          setSelectedAsset(asset);
        }
      };
      return (
        <SidebarMenuItem key={node.id}>
              <SidebarMenuButton
                isActive={selectedAsset?.id === node.id}
                onClick={() => handleAssetClick(node.asset)}
                disabled={activeTab !== 'browse'}
                >
                <Icon/>
                <span className="truncate max-w-[140px] block whitespace-nowrap overflow-hidden text-ellipsis">{node.name}</span>
                <MoreVertical className="w-4 h-4 ml-auto text-black group-hover:text-black" />
            </SidebarMenuButton>
        </SidebarMenuItem>
  
      );
    });
  }
  return (
    <>
      {showChanges && changes && (
        <SidebarGroup>
          <SidebarGroupLabel>Changes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {changes.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton>
                    <File />
                    <span className="truncate max-w-[140px] block whitespace-nowrap overflow-hidden text-ellipsis">{item.file}</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>{item.state}</SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}
      <SidebarGroup>
        <SidebarGroupLabel>Files</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {renderTree(nodes)}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
