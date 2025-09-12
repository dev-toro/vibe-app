// src/services/packageService.ts
export type Package = {
  id: string;
  name: string;
  description: string;
};

export function getPackages(): Package[] {
  return [
    { id: '1', name: 'Alpha', description: 'Alpha package description.' },
    { id: '2', name: 'Beta', description: 'Beta package description.' },
    { id: '3', name: 'Gamma', description: 'Gamma package description.' },
    { id: '4', name: 'Delta', description: 'Delta package description.' },
  ];
}

export function getPackageById(id: string): Package | undefined {
  return getPackages().find(pkg => pkg.id === id);
}
