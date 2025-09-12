
import { getPackages } from '../services/packageService';
import PackageCard from '../components/PackageCard';

export default function Listing() {
  const packages = getPackages();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Package Listing</h2>
      <div className="w-full max-w-md">
        {packages.map(pkg => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}
