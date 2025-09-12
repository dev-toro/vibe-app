import * as React from 'react';
import { Input } from '../components/ui/input';

interface PackageSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function PackageSearch({ value, onChange }: PackageSearchProps) {
  return (
    <div className="w-full max-w-2xl">
      <Input
        type="text"
        placeholder="Search packages by name..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="mb-2"
      />
    </div>
  );
}
