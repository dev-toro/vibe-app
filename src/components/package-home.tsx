
import type { Package } from '../services/packageService';


// Recursively count all assets in folders and top-level assets
function getTotalAssets(pkg: Package): number {
  let count = pkg.assets?.length ?? 0;
  function countFolder(folder: any): number {
    let c = folder.assets?.length ?? 0;
    if (folder.folders) {
      c += folder.folders.reduce((sum: number, f: any) => sum + countFolder(f), 0);
    }
    return c;
  }
  if (pkg.folders) {
    count += pkg.folders.reduce((sum: number, f: any) => sum + countFolder(f), 0);
  }
  return count;
}

// Mocked recent changes for demo
const recentChanges = [
  { user: 'alice', change: 'Added new API endpoint', date: '2025-09-13' },
  { user: 'bob', change: 'Updated config for feature flags', date: '2025-09-12' },
  { user: 'carol', change: 'Refactored job schedules', date: '2025-09-11' },
];

export function PackageHome({ pkg }: { pkg: Package }) {
  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4 flex flex-col gap-8">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-6">
        <div>
          <h2 className="text-4xl font-bold mb-1 flex items-center gap-2">
            {pkg.name}
            {pkg.favorited && <span className="text-yellow-400" title="Favorited">★</span>}
          </h2>
          <div className="flex gap-4 text-gray-500 text-sm">
            <span>ID: <span className="font-mono">{pkg.id}</span></span>
            <span>Created: {pkg.createdAt.slice(0,10)}</span>
          </div>
        </div>
        <div className="flex gap-6 mt-2 md:mt-0">
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">{pkg.folders?.length ?? 0}</span>
            <span className="text-xs text-gray-400">Folders</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold">{getTotalAssets(pkg)}</span>
            <span className="text-xs text-gray-400">Total Assets</span>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Getting Started */}
        <div className="bg-muted rounded-lg p-6 shadow flex flex-col gap-2 col-span-1">
          <h3 className="font-semibold text-lg mb-2">Getting Started</h3>
          <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1">
            <li>Browse the asset explorer to see available folders and assets.</li>
            <li>Click on an asset to view or edit its YAML configuration in the sandbox.</li>
            <li>Check the README for package-specific instructions.</li>
            <li>Review recent changes to stay up to date with team activity.</li>
          </ol>
        </div>

        {/* README/Description */}
        <div className="bg-white rounded-lg p-6 shadow border col-span-1 md:col-span-2 flex flex-col">
          <h3 className="font-semibold text-lg mb-2">README</h3>
          <p className="whitespace-pre-line text-gray-800 text-sm">{pkg.description}</p>
        </div>

        {/* Recent Changes */}
        <div className="bg-muted rounded-lg p-6 shadow col-span-1 md:col-span-2 order-3 md:order-none">
          <h3 className="font-semibold text-lg mb-2">Recent Changes</h3>
          <ul className="divide-y divide-gray-200">
            {recentChanges.map((change, i) => (
              <li key={i} className="py-2 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">{change.change}</span>
                <span className="text-xs text-gray-500">{change.user} &middot; {change.date}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Collaboration/Team Section */}
        <div className="bg-white rounded-lg p-6 shadow border col-span-1 flex flex-col gap-2">
          <h3 className="font-semibold text-lg mb-2">Collaboration</h3>
          <p className="text-gray-700 text-sm mb-2">Invite your team, assign roles, and collaborate on assets and configs in real time.</p>
          <ul className="flex flex-wrap gap-2">
            <li className="bg-gray-100 rounded px-2 py-1 text-xs text-gray-700">alice (admin)</li>
            <li className="bg-gray-100 rounded px-2 py-1 text-xs text-gray-700">bob (editor)</li>
            <li className="bg-gray-100 rounded px-2 py-1 text-xs text-gray-700">carol (viewer)</li>
            <li className="bg-gray-100 rounded px-2 py-1 text-xs text-gray-700">dave (editor)</li>
            <li className="bg-gray-100 rounded px-2 py-1 text-xs text-gray-700">eve (editor)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
