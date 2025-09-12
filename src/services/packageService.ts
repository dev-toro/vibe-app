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
    { id: '5', name: 'Epsilon', description: 'Epsilon package description.' },
    { id: '6', name: 'Zeta', description: 'Zeta package description.' },
    { id: '7', name: 'Eta', description: 'Eta package description.' },
    { id: '8', name: 'Theta', description: 'Theta package description.' },
    { id: '9', name: 'Iota', description: 'Iota package description.' },
    { id: '10', name: 'Kappa', description: 'Kappa package description.' },
    { id: '11', name: 'Lambda', description: 'Lambda package description.' },
    { id: '12', name: 'Mu', description: 'Mu package description.' },
    { id: '13', name: 'Nu', description: 'Nu package description.' },
    { id: '14', name: 'Xi', description: 'Xi package description.' },
    { id: '15', name: 'Omicron', description: 'Omicron package description.' },
  ];
}

export function getPackageById(id: string): Package | undefined {
  return getPackages().find(pkg => pkg.id === id);
}
