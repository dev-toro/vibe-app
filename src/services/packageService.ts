
// src/services/packageService.ts
export type Asset = {
  id: string;
  name: string;
  yaml: string;
};

export type AssetFolder = {
  id: string;
  name: string;
  assets: Asset[];
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
          id: 'f1',
          name: 'Config Examples',
          assets: [
            { id: 'a1', name: 'Asset A1', yaml: 'config: value\nfoo: bar' },
            { id: 'a2', name: 'Asset A2', yaml: 'config: value2\nbar: baz' },
          ],
        },
        {
          id: 'f2',
          name: 'Advanced',
          assets: [
            { id: 'a3', name: 'Asset A3', yaml: 'advanced: true\nfoo: advanced' },
          ],
        },
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
            { id: 'b1', name: 'Asset B1', yaml: 'config: beta\nfoo: beta' },
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
        { id: 'g1', name: 'Asset G1', yaml: 'config: gamma\nfoo: gamma' },
        { id: 'g2', name: 'Asset G2', yaml: 'config: gamma2\nbar: gamma2' },
      ],
    },
    // ...other packages remain unchanged for brevity...
    { id: '4', name: 'Delta', description: 'Delta package description.', lastAccessed: '2025-09-12T08:00:00Z', createdAt: '2025-08-15T13:00:00Z', favorited: false, assets: [] },
    { id: '5', name: 'Epsilon', description: 'Epsilon package description.', lastAccessed: '2025-09-08T19:30:00Z', createdAt: '2025-08-20T10:10:00Z', favorited: false, assets: [] },
    { id: '6', name: 'Zeta', description: 'Zeta package description.', lastAccessed: '2025-09-07T12:00:00Z', createdAt: '2025-08-25T08:45:00Z', favorited: true, assets: [
      { id: 'z1', name: 'Asset Z1', yaml: 'config: zeta\nfoo: zeta' },
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
