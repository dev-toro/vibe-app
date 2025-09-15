
// src/services/packageService.ts
export type AssetType =
  | 'Objects'
  | 'Events'
  | 'Transformations'
  | 'Views'
  | 'Reports'
  | 'Knowledge'
  | 'Action Flow'
  | 'Tasks'
  | 'Data Connection'
  | 'Variables';

// AssetType to icon mapping:
// Objects: SquareDot
// Events: Workflow
// Transformations: Shuffle
// Views: Layout
// Reports: BarChart
// Knowledge: SquareLibrary
// Action Flow: Activity
// Tasks: CheckSquare
// Data Connection: Database
// Variables: Variable

export type Asset = {
  id: string;
  name: string;
  type: AssetType;
  icon?: string; // optional icon name for UI
  yaml: string;
};

export type AssetFolder = {
  id: string;
  name: string;
  assets: Asset[];
  folders?: AssetFolder[];
};
export type Package = {
  id: string;
  name: string;
  description: string;
  lastAccessed: string; // ISO date string
  createdAt: string;    // ISO date string
  favorited: boolean;
  assets?: Asset[]; // For backward compatibility
  folders?: AssetFolder[];
};

export function getPackages(): Package[] {
  return [
    {
      id: '1',
      name: 'Alpha',
      description: 'Alpha package description.',
      lastAccessed: '2025-09-11T14:23:00Z',
      createdAt: '2025-08-01T09:00:00Z',
      favorited: true,
      folders: [
        {
          id: 'shared-root',
          name: 'Shared',
          assets: [
            { id: 'shared-1', name: 'Global Settings', type: 'Objects', icon: 'SquareDot', yaml: 'type: Objects\nsettings:\n  global: true\n  version: 1.2.3\n  updated: 2025-09-14' },
            { id: 'shared-2', name: 'Healthcheck', type: 'Events', icon: 'Workflow', yaml: 'type: Events\nendpoint: /api/health\nmethod: GET\ndescription: Healthcheck event' },
          ],
          folders: [
            {
              id: 'shared-views',
              name: 'Shared Views',
              assets: [
                { id: 'shared-view-1', name: 'Dashboard', type: 'Views', icon: 'Layout', yaml: 'type: Views\ntitle: Dashboard\nlayout: grid\ncreated: 2025-09-10' },
                { id: 'shared-view-2', name: 'Overview', type: 'Views', icon: 'Layout', yaml: 'type: Views\ntitle: Overview\nlayout: list\ncreated: 2025-09-11' },
                { id: 'shared-view-3', name: 'Workspace', type: 'Views', icon: 'Layout', yaml: 'type: Views\ntitle: Workspace\nlayout: mosaic\ncreated: 2025-09-12' },
                { id: 'shared-view-4', name: 'Board', type: 'Views', icon: 'Layout', yaml: 'type: Views\ntitle: Board\nlayout: kanban\ncreated: 2025-09-13' },
                { id: 'shared-view-5', name: 'Panel', type: 'Views', icon: 'Layout', yaml: 'type: Views\ntitle: Panel\nlayout: grid\ncreated: 2025-09-14' },
                { id: 'shared-view-6', name: 'Monitor', type: 'Views', icon: 'Layout', yaml: 'type: Views\ntitle: Monitor\nlayout: list\ncreated: 2025-09-15' },
                { id: 'shared-view-7', name: 'Console', type: 'Views', icon: 'Layout', yaml: 'type: Views\ntitle: Console\nlayout: mosaic\ncreated: 2025-09-16' },
              ],
            },
            {
              id: 'shared-mixed',
              name: 'Mixed Assets',
              assets: [
                { id: 'shared-mix-1', name: 'Nightly Sync', type: 'Tasks', icon: 'CheckSquare', yaml: 'type: Tasks\nname: Nightly Sync\nschedule: "0 2 * * *"\nowner: ops-team' },
                { id: 'shared-mix-2', name: 'Feature Flags', type: 'Objects', icon: 'SquareDot', yaml: 'type: Objects\nsettings:\n  featureA: enabled\n  featureB: disabled' },
                { id: 'shared-mix-3', name: 'Data Import', type: 'Transformations', icon: 'Shuffle', yaml: 'type: Transformations\nendpoint: /api/import\nmethod: POST\nnotes: Handles bulk data import' },
              ],
            },
          ],
        },
        {
          id: 'team-alice',
          name: "Alice's Folder",
          assets: [
            { id: 'alice-asset-1', name: 'UI 12', type: 'Views', icon: 'Layout', yaml: 'type: Views\ntitle: UI 12\nlayout: grid\nowner: Alice' },
            { id: 'alice-asset-2', name: 'Endpoint 34', type: 'Events', icon: 'Workflow', yaml: 'type: Events\nendpoint: /api/alice/endpoint-34\nmethod: GET\ndescription: Static Event' },
            { id: 'alice-asset-3', name: 'Settings 56', type: 'Objects', icon: 'SquareDot', yaml: 'type: Objects\nsettings:\n  settings_56: true\n  updated: 2025-09-14' },
            { id: 'alice-asset-4', name: 'Task 78', type: 'Tasks', icon: 'CheckSquare', yaml: 'type: Tasks\nname: Task 78\nschedule: 12 30 * * *\nnotes: Static task for Alice' },
          ],
          folders: [
            {
              id: 'alice-deep',
              name: "Alice's Deep Work",
              assets: [
                { id: 'alice-deep-asset-1', name: 'Alice Alpha view', type: 'Views', icon: 'Layout', yaml: 'type: Views\ntitle: Alice Alpha view\nlayout: list' },
                { id: 'alice-deep-asset-2', name: 'Alice Beta event', type: 'Events', icon: 'Workflow', yaml: 'type: Events\nendpoint: /api/alice-beta-event\nmethod: POST' },
              ],
              folders: [
                {
                  id: 'alice-deepest',
                  name: "Alice's Deepest",
                  assets: [
                    { id: 'alice-deepest-asset-1', name: 'Alice Deepest Spec view', type: 'Views', icon: 'Layout', yaml: 'type: Views\ntitle: Alice Deepest Spec view\nlayout: mosaic' },
                    { id: 'alice-deepest-asset-2', name: 'Alice Deepest Doc event', type: 'Events', icon: 'Workflow', yaml: 'type: Events\nendpoint: /api/alice-deepest-doc-event\nmethod: PUT' },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'team-bob',
          name: "Bob's Folder",
          assets: [
            { id: 'bob-asset-1', name: 'Panel 21', type: 'Views', icon: 'Layout', yaml: 'type: Views\ntitle: Panel 21\nlayout: list\nowner: Bob' },
            { id: 'bob-asset-2', name: 'Service 43', type: 'Transformations', icon: 'Shuffle', yaml: 'type: Transformations\nendpoint: /api/bob/service-43\nmethod: POST\ndescription: Static Transformation' },
            { id: 'bob-asset-3', name: 'Config 65', type: 'Objects', icon: 'SquareDot', yaml: 'type: Objects\nsettings:\n  config_65: true\n  updated: 2025-09-14' },
            { id: 'bob-asset-4', name: 'Job 87', type: 'Tasks', icon: 'CheckSquare', yaml: 'type: Tasks\nname: Job 87\nschedule: 8 15 * * *\nnotes: Static task for Bob' },
          ],
          folders: [
            {
              id: 'bob-deep',
              name: "Bob's Deep Work",
              assets: [
                { id: 'bob-deep-asset-1', name: 'Bob Gamma view', type: 'Views', icon: 'Layout', yaml: 'type: Views\ntitle: Bob Gamma view\nlayout: grid' },
                { id: 'bob-deep-asset-2', name: 'Bob Delta event', type: 'Events', icon: 'Workflow', yaml: 'type: Events\nendpoint: /api/bob-delta-event\nmethod: GET' },
              ],
              folders: [
                {
                  id: 'bob-deepest',
                  name: "Bob's Deepest",
                  assets: [
                    { id: 'bob-deepest-asset-1', name: 'Bob Deepest Run', type: 'Tasks', icon: 'CheckSquare', yaml: 'type: Tasks\nname: Bob Deepest Run\nschedule: 6 45 * * *' },
                  ],
                },
              ],
            },
          ],
        },
        // ...repeat for Carol, Dave, Eve with fixed data as above...
      ],
    },
    {
      id: '2',
      name: 'Beta',
      description: 'Beta package description.',
      lastAccessed: '2025-09-10T10:12:00Z',
      createdAt: '2025-07-28T11:30:00Z',
      favorited: false,
      folders: [
        {
          id: 'f3',
          name: 'Beta Folder',
          assets: [
            { id: 'b1', name: 'Job Runner', type: 'Tasks', icon: 'CheckSquare', yaml: 'type: Tasks\nname: Beta Job\nschedule: "0 0 * * *"\nscript: run.sh' },
          ],
        },
      ],
    },
    {
      id: '3',
      name: 'Gamma',
      description: 'Gamma package description.',
      lastAccessed: '2025-09-09T16:45:00Z',
      createdAt: '2025-08-10T15:20:00Z',
      favorited: true,
      assets: [
        { id: 'g1', name: 'Gamma View', type: 'Views', icon: 'Layout', yaml: 'type: Views\ntitle: Gamma View\nlayout: list' },
        { id: 'g2', name: 'Gamma API', type: 'Events', icon: 'Workflow', yaml: 'type: Events\nendpoint: /api/gamma\nmethod: POST' },
      ],
    },
    // ...other packages remain unchanged for brevity...
    { id: '4', name: 'Delta', description: 'Delta package description.', lastAccessed: '2025-09-12T08:00:00Z', createdAt: '2025-08-15T13:00:00Z', favorited: false, assets: [] },
    { id: '5', name: 'Epsilon', description: 'Epsilon package description.', lastAccessed: '2025-09-08T19:30:00Z', createdAt: '2025-08-20T10:10:00Z', favorited: false, assets: [] },
    { id: '6', name: 'Zeta', description: 'Zeta package description.', lastAccessed: '2025-09-07T12:00:00Z', createdAt: '2025-08-25T08:45:00Z', favorited: true, assets: [
      { id: 'z1', name: 'Zeta Config', type: 'Objects', icon: 'SquareDot', yaml: 'type: Objects\nsettings:\n  zeta: true' },
    ] },
    { id: '7', name: 'Eta', description: 'Eta package description.', lastAccessed: '2025-09-06T17:15:00Z', createdAt: '2025-08-30T14:00:00Z', favorited: false, assets: [] },
    { id: '8', name: 'Theta', description: 'Theta package description.', lastAccessed: '2025-09-05T11:05:00Z', createdAt: '2025-09-01T09:30:00Z', favorited: false, assets: [] },
    { id: '9', name: 'Iota', description: 'Iota package description.', lastAccessed: '2025-09-04T13:40:00Z', createdAt: '2025-09-03T16:00:00Z', favorited: false, assets: [] },
    { id: '10', name: 'Kappa', description: 'Kappa package description.', lastAccessed: '2025-09-03T15:55:00Z', createdAt: '2025-09-05T12:00:00Z', favorited: false, assets: [] },
    { id: '11', name: 'Lambda', description: 'Lambda package description.', lastAccessed: '2025-09-02T09:20:00Z', createdAt: '2025-09-07T10:00:00Z', favorited: false, assets: [] },
    { id: '12', name: 'Mu', description: 'Mu package description.', lastAccessed: '2025-09-01T18:10:00Z', createdAt: '2025-09-09T11:15:00Z', favorited: false, assets: [] },
    { id: '13', name: 'Nu', description: 'Nu package description.', lastAccessed: '2025-08-31T20:00:00Z', createdAt: '2025-09-10T13:30:00Z', favorited: false, assets: [] },
    { id: '14', name: 'Xi', description: 'Xi package description.', lastAccessed: '2025-08-30T07:45:00Z', createdAt: '2025-09-11T08:00:00Z', favorited: false, assets: [] },
    { id: '15', name: 'Omicron', description: 'Omicron package description.', lastAccessed: '2025-08-29T22:30:00Z', createdAt: '2025-09-12T09:00:00Z', favorited: false, assets: [] },
  ];
}

export function getPackageById(id: string): Package | undefined {
  return getPackages().find((pkg: Package) => pkg.id === id);
}
