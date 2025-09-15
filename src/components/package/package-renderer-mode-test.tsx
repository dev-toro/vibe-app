import React from 'react';
import type { Asset } from '../../services/packageService';
import {
  SquareDot,
  Workflow,
  Shuffle,
  Layout,
  BarChart,
  SquareLibrary,
  Activity,
  CheckSquare,
  Database,
  Variable
} from 'lucide-react';

// Simple YAML parser for key-value pairs and nested objects
function parseYaml(yaml: string): Record<string, any> {
  try {
    // Use a basic parser for demo (not production safe)
    const lines = yaml.split('\n');
    const result: Record<string, any> = {};
    let currentKey = '';
    for (let line of lines) {
      if (/^\s*$/.test(line)) continue;
      const indent = line.match(/^\s*/)?.[0].length || 0;
      if (indent === 0 && line.includes(':')) {
        const [key, ...rest] = line.split(':');
        const value = rest.join(':').trim();
        if (value === '') {
          currentKey = key.trim();
          result[currentKey] = {};
        } else {
          result[key.trim()] = value;
        }
      } else if (indent > 0 && currentKey) {
        const [subKey, ...rest] = line.trim().split(':');
        result[currentKey][subKey.trim()] = rest.join(':').trim();
      }
    }
    return result;
  } catch {
    return {};
  }
}

const typeIcons: Record<string, React.ReactNode> = {
  'Objects': <SquareDot className="text-blue-500" size={32} />,
  'Events': <Workflow className="text-emerald-500" size={32} />,
  'Transformations': <Shuffle className="text-purple-500" size={32} />,
  'Views': <Layout className="text-orange-500" size={32} />,
  'Reports': <BarChart className="text-pink-500" size={32} />,
  'Knowledge': <SquareLibrary className="text-yellow-500" size={32} />,
  'Action Flow': <Activity className="text-indigo-500" size={32} />,
  'Tasks': <CheckSquare className="text-green-500" size={32} />,
  'Data Connection': <Database className="text-cyan-500" size={32} />,
  'Variables': <Variable className="text-gray-500" size={32} />,
};

function Sparkle() {
  // Fun animated sparkle
  return <span className="inline-block animate-pulse text-yellow-400">✨</span>;
}

function renderMockUI(type: string, data: Record<string, any>) {
  switch (type) {
    case 'Objects':
      return (
        <div className="w-full max-w-md bg-gradient-to-br from-blue-50 to-white rounded shadow p-6 border border-blue-100">
          <div className="flex items-center gap-2 mb-2">{typeIcons['Objects']}<h2 className="font-bold text-lg">Object Settings <Sparkle /></h2></div>
          <ul className="text-gray-700 space-y-1">
            {data.settings && Object.entries(data.settings).map(([k, v]) => (
              <li key={k}><span className="font-medium">{k}:</span> <span className="bg-blue-100 rounded px-2 py-0.5 ml-1">{String(v)}</span></li>
            ))}
          </ul>
        </div>
      );
    case 'Events':
      return (
        <div className="w-full max-w-md bg-gradient-to-br from-emerald-50 to-white rounded shadow p-6 border border-emerald-100">
          <div className="flex items-center gap-2 mb-2">{typeIcons['Events']}<h2 className="font-bold text-lg">Event Endpoint <Sparkle /></h2></div>
          <div className="mb-1"><span className="font-medium">Endpoint:</span> <span className="bg-emerald-100 rounded px-2 py-0.5 ml-1">{data.endpoint}</span></div>
          <div className="mb-1"><span className="font-medium">Method:</span> <span className="bg-emerald-100 rounded px-2 py-0.5 ml-1">{data.method}</span></div>
          <div className="mb-1"><span className="font-medium">Description:</span> <span className="bg-emerald-50 rounded px-2 py-0.5 ml-1">{data.description}</span></div>
        </div>
      );
    case 'Transformations':
      return (
        <div className="w-full max-w-md bg-gradient-to-br from-purple-50 to-white rounded shadow p-6 border border-purple-100">
          <div className="flex items-center gap-2 mb-2">{typeIcons['Transformations']}<h2 className="font-bold text-lg">Transformation <Sparkle /></h2></div>
          <div className="mb-1"><span className="font-medium">Endpoint:</span> <span className="bg-purple-100 rounded px-2 py-0.5 ml-1">{data.endpoint}</span></div>
          <div className="mb-1"><span className="font-medium">Method:</span> <span className="bg-purple-100 rounded px-2 py-0.5 ml-1">{data.method}</span></div>
          <div className="mb-1"><span className="font-medium">Notes:</span> <span className="bg-purple-50 rounded px-2 py-0.5 ml-1">{data.notes}</span></div>
        </div>
      );
    case 'Views':
      return (
        <div className="w-full max-w-md bg-gradient-to-br from-orange-50 to-white rounded shadow p-6 border border-orange-100">
          <div className="flex items-center gap-2 mb-2">{typeIcons['Views']}<h2 className="font-bold text-lg">View <Sparkle /></h2></div>
          <div className="mb-1"><span className="font-medium">Title:</span> <span className="bg-orange-100 rounded px-2 py-0.5 ml-1">{data.title}</span></div>
          <div className="mb-1"><span className="font-medium">Layout:</span> <span className="bg-orange-100 rounded px-2 py-0.5 ml-1">{data.layout}</span></div>
          <div className="mb-1"><span className="font-medium">Created:</span> <span className="bg-orange-50 rounded px-2 py-0.5 ml-1">{data.created}</span></div>
        </div>
      );
    case 'Tasks':
      return (
        <div className="w-full max-w-md bg-gradient-to-br from-green-50 to-white rounded shadow p-6 border border-green-100">
          <div className="flex items-center gap-2 mb-2">{typeIcons['Tasks']}<h2 className="font-bold text-lg">Task <Sparkle /></h2></div>
          <div className="mb-1"><span className="font-medium">Name:</span> <span className="bg-green-100 rounded px-2 py-0.5 ml-1">{data.name}</span></div>
          <div className="mb-1"><span className="font-medium">Schedule:</span> <span className="bg-green-100 rounded px-2 py-0.5 ml-1">{data.schedule}</span></div>
          <div className="mb-1"><span className="font-medium">Owner/Notes:</span> <span className="bg-green-50 rounded px-2 py-0.5 ml-1">{data.owner || data.notes}</span></div>
        </div>
      );
    default:
      return (
        <div className="w-full max-w-md bg-gradient-to-br from-gray-50 to-white rounded shadow p-6 text-gray-400 text-center border border-gray-100">
          <div className="flex items-center justify-center gap-2 mb-2">{typeIcons[type] || <Variable className="text-gray-400" size={32} />}<h2 className="font-bold text-lg">{type} <Sparkle /></h2></div>
          <div>No creative mock UI for this asset type yet.<br /></div>
          <pre className="text-xs mt-2 bg-gray-50 rounded p-2 text-left overflow-x-auto">{JSON.stringify(data, null, 2)}</pre>
        </div>
      );
  }
}

export function PackageRendererModeTest({ selectedAsset }: { selectedAsset: Asset }) {
  const data = parseYaml(selectedAsset.yaml);
  return (
    <div className="flex flex-1 items-center justify-center">
      {renderMockUI(selectedAsset.type, data)}
    </div>
  );
}
