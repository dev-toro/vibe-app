"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Box,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  MonitorDot,
  PieChart,
  Settings2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { useLocation } from "react-router-dom"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Toro",
    email: "d.toro@celonis.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Workbench",
      url: "#",
      icon: Box,
      isActive: true,
      items: [
        {
          title: "Playground",
          url: "/playground",
        }, 
        {
          title: "Projects",
          url: "/projects",
        },
        {
          title: "Libraries",
          url: "/libraries",
        },
        {
          title: "Marketplace",
          url: "/marketplace",
        },
      ],
    },
    {
      title: "Monitoring",
      url: "#",
      icon: MonitorDot,
      items: [
        {
          title: "Runtimes",
          url: "/runtimes",
        },
        {
          title: "Workloads",
          url: "/workloads",
        },
        {
          title: "Data Ingestions",
          url: "/data-ingestion",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  // Compute navMain with isActive set based on current location
  const navMain = React.useMemo(() => {
    return data.navMain.map(main => {
      // Exact match for subitems
      const subActive = main.items?.some(item => item.url && location.pathname === item.url);
      // Only set main as active if its url is not '#' and matches exactly
      const mainActive = main.url && main.url !== '#' && location.pathname === main.url;
      return {
        ...main,
        isActive: !!subActive || !!mainActive,
        items: main.items?.map(item => ({
          ...item,
          isActive: item.url && location.pathname === item.url,
        })),
      };
    });
  }, [location.pathname]);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
