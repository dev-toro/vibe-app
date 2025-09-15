import * as React from "react"
import { Box, ChevronDown, ChevronRight, File, Folder, MoreVertical } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  changes: [
    {
      file: "README.md",
      state: "M",
    },
    {
      file: "api/hello/route.ts",
      state: "U",
    },
    {
      file: "app/layout.tsx",
      state: "M",
    },
  ],
  tree: [
    [
      "app",
      [
        "api",
        ["hello", ["route.ts"]],
        "page.tsx",
        "layout.tsx",
        ["blog", ["page.tsx"]],
      ],
    ],
    [
      "components",
      ["ui", "button.tsx", "card.tsx"],
      "header.tsx",
      "footer.tsx",
    ],
    ["lib", ["util.ts"]],
    ["public", "favicon.ico", "vercel.svg"],
    ".eslintrc.json",
    ".gitignore",
    "next.config.js",
    "tailwind.config.js",
    "package.json",
    "README.md",
  ],
}

// Props match AssetTreeRenderer
export function TreeSidebar({
  nodes = [],
  expanded = {},
  setExpanded = () => {},
  selectedAsset = null,
  setSelectedAsset = () => {},
  assetTypeIcon = {},
  activeTab = 'browse',
  showChanges = false,
  changes = [],
}: {
  nodes: any[];
  expanded: { [id: string]: boolean };
  setExpanded: (cb: (prev: { [id: string]: boolean }) => { [id: string]: boolean }) => void;
  selectedAsset: any;
  setSelectedAsset: (asset: any) => void;
  assetTypeIcon: Record<string, any>;
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
      if (node.asset?.type && assetTypeIcon[node.asset.type]) {
        Icon = assetTypeIcon[node.asset.type];
      }
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
                {node.name}
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
                    {item.file}
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
