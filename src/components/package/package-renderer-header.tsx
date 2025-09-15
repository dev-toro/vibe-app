"use client";
import * as React from 'react';
import {
  ChevronLeftIcon,
  HistoryIcon,
  MessageSquareText,
} from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../ui/avatar';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import type { Asset } from '../../services/packageService';
import { SelectedAssetContext } from './package-sidebar';
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

export interface Navbar17User {
  id: string;
  name: string;
  avatar?: string;
  fallback: string;
  isOnline?: boolean;
}

export interface PackageRendererHeaderProps extends React.HTMLAttributes<HTMLElement> {
  selectedAsset: Asset;
  title?: string;
  users?: Navbar17User[];
  additionalUsersCount?: number;
  showBackButton?: boolean;
  onHistoryClick?: () => void;
  onCommentsClick?: () => void;
  onAddUserClick?: () => void;
  onUserClick?: (userId: string) => void;
  onAdditionalUsersClick?: () => void;
  tabsValue?: 'edit' | 'test';
  onTabsChange?: (mode: 'edit' | 'test') => void;
}

const defaultUsers: Navbar17User[] = [
  {
    id: '1',
    name: 'Kelly King',
    avatar: './avatar-80-07.jpg',
    fallback: 'KK',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Martha Johnson',
    avatar: './avatar-80-06.jpg',
    fallback: 'MJ',
    isOnline: false,
  },
  {
    id: '3',
    name: 'Linda Green',
    avatar: './avatar-80-05.jpg',
    fallback: 'LG',
    isOnline: false,
  },
];

export const PackageRendererHeader = React.forwardRef<HTMLElement, PackageRendererHeaderProps>(
  (
    {
      className,
      selectedAsset,
      title,
      users = defaultUsers,
      additionalUsersCount = 0,
      showBackButton = true,
      onHistoryClick,
      onCommentsClick,
      onAddUserClick,
      onUserClick,
      onAdditionalUsersClick,
      ...props
    },
    ref
  ) => {
    const { setSelectedAsset } = React.useContext(SelectedAssetContext) as { setSelectedAsset: (a: Asset | null) => void };
    const handleBackClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setSelectedAsset(null);
    };
    return (
      <header
        ref={ref}
        className={cn(
          'border-b px-4 md:px-6 [&_*]:no-underline',
          className
        )}
        {...props}
      >
        <div className="flex h-12 items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-2">
            {showBackButton && (
              <Button
                className="size-8"
                variant="ghost"
                size="icon"
                aria-label="Go back"
                onClick={handleBackClick}
              >
                <ChevronLeftIcon />
              </Button>
            )}
            <h1 className="text-sm font-medium">{title || selectedAsset.name}</h1>
          </div>
            {/* Center: Tabs */}
            <div className="flex-1 flex justify-center">
              <Tabs value={props.tabsValue} onValueChange={v => props.onTabsChange?.(v as 'edit' | 'test')}>
                <TabsList>
                  <TabsTrigger value="test">Test</TabsTrigger>
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* History button */}
            <Button
              size="icon"
              variant="ghost"
              className="text-muted-foreground size-8 rounded-full shadow-none"
              aria-label="History"
              onClick={(e) => {
                e.preventDefault();
                if (onHistoryClick) onHistoryClick();
              }}
            >
              <HistoryIcon size={16} aria-hidden="true" />
            </Button>
            {/* Comments button */}
            <Button
              size="icon"
              variant="ghost"
              className="text-muted-foreground size-8 rounded-full shadow-none"
              aria-label="Comments"
              onClick={(e) => {
                e.preventDefault();
                if (onCommentsClick) onCommentsClick();
              }}
            >
              <MessageSquareText size={16} aria-hidden="true" />
            </Button>
            {/* Online users */}
            <div className="ml-2 flex items-center gap-2">
              {users.map((user) => (
                <div key={user.id} className="relative">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (onUserClick) onUserClick(user.id);
                    }}
                    className="cursor-pointer"
                    aria-label={`View ${user.name}'s profile`}
                  >
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.fallback}</AvatarFallback>
                    </Avatar>
                  </button>
                  <span 
                    className={cn(
                      "border-background absolute -end-0.5 -bottom-0.5 size-3 rounded-full border-2",
                      user.isOnline ? "bg-emerald-500" : "bg-muted-foreground"
                    )}
                  >
                    <span className="sr-only">
                      {user.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </span>
                </div>
              ))}
              {additionalUsersCount > 0 && (
                <Button
                  variant="secondary"
                  className="bg-secondary text-muted-foreground ring-background hover:bg-secondary hover:text-foreground flex size-8 items-center justify-center rounded-full text-xs"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onAdditionalUsersClick) onAdditionalUsersClick();
                  }}
                  aria-label={`View ${additionalUsersCount} more users`}
                >
                  +{additionalUsersCount}
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
);
PackageRendererHeader.displayName = 'PackageRendererHeader';
