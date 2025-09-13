import React from 'react';
import type { Package } from '../services/packageService';

export function PackageHome({ pkg }: { pkg: Package }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">{pkg.name}</h2>
      <p className="mb-2 text-gray-500">ID: <span className="font-mono">{pkg.id}</span></p>
      <p>{pkg.description}</p>
    </div>
  );
}
