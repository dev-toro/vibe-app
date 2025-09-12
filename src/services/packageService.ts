
// src/services/packageService.ts
export type Package = {
  id: string;
  name: string;
  description: string;
  lastAccessed: string; // ISO date string
  createdAt: string;    // ISO date string
  favorited: boolean;
};

export function getPackages(): Package[] {
  return [
    { id: '1', name: 'Alpha', description: 'Alpha package description.', lastAccessed: '2025-09-11T14:23:00Z', createdAt: '2025-08-01T09:00:00Z', favorited: true },
    { id: '2', name: 'Beta', description: 'Beta package description.', lastAccessed: '2025-09-10T10:12:00Z', createdAt: '2025-07-28T11:30:00Z', favorited: false },
    { id: '3', name: 'Gamma', description: 'Gamma package description.', lastAccessed: '2025-09-09T16:45:00Z', createdAt: '2025-08-10T15:20:00Z', favorited: true },
    { id: '4', name: 'Delta', description: 'Delta package description.', lastAccessed: '2025-09-12T08:00:00Z', createdAt: '2025-08-15T13:00:00Z', favorited: false },
    { id: '5', name: 'Epsilon', description: 'Epsilon package description.', lastAccessed: '2025-09-08T19:30:00Z', createdAt: '2025-08-20T10:10:00Z', favorited: false },
    { id: '6', name: 'Zeta', description: 'Zeta package description.', lastAccessed: '2025-09-07T12:00:00Z', createdAt: '2025-08-25T08:45:00Z', favorited: true },
    { id: '7', name: 'Eta', description: 'Eta package description.', lastAccessed: '2025-09-06T17:15:00Z', createdAt: '2025-08-30T14:00:00Z', favorited: false },
    { id: '8', name: 'Theta', description: 'Theta package description.', lastAccessed: '2025-09-05T11:05:00Z', createdAt: '2025-09-01T09:30:00Z', favorited: false },
    { id: '9', name: 'Iota', description: 'Iota package description.', lastAccessed: '2025-09-04T13:40:00Z', createdAt: '2025-09-03T16:00:00Z', favorited: false },
    { id: '10', name: 'Kappa', description: 'Kappa package description.', lastAccessed: '2025-09-03T15:55:00Z', createdAt: '2025-09-05T12:00:00Z', favorited: false },
    { id: '11', name: 'Lambda', description: 'Lambda package description.', lastAccessed: '2025-09-02T09:20:00Z', createdAt: '2025-09-07T10:00:00Z', favorited: false },
    { id: '12', name: 'Mu', description: 'Mu package description.', lastAccessed: '2025-09-01T18:10:00Z', createdAt: '2025-09-09T11:15:00Z', favorited: false },
    { id: '13', name: 'Nu', description: 'Nu package description.', lastAccessed: '2025-08-31T20:00:00Z', createdAt: '2025-09-10T13:30:00Z', favorited: false },
    { id: '14', name: 'Xi', description: 'Xi package description.', lastAccessed: '2025-08-30T07:45:00Z', createdAt: '2025-09-11T08:00:00Z', favorited: false },
    { id: '15', name: 'Omicron', description: 'Omicron package description.', lastAccessed: '2025-08-29T22:30:00Z', createdAt: '2025-09-12T09:00:00Z', favorited: false },
  ];
}

export function getPackageById(id: string): Package | undefined {
  return getPackages().find(pkg => pkg.id === id);
}
