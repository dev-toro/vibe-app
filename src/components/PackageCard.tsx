import { Link } from 'react-router-dom';
import type { Package } from '../services/packageService';

export default function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <Link
      to={`/package/${pkg.id}`}
      className="block border rounded-lg p-4 shadow hover:shadow-lg transition mb-4 bg-white"
    >
      <h3 className="text-lg font-semibold mb-1">{pkg.name}</h3>
      <p className="text-gray-500 text-sm">{pkg.description}</p>
    </Link>
  );
}
