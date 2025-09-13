
// src/services/packageService.ts
export type AssetType = 'view' | 'api' | 'config' | 'job';

export type Asset = {
  id: string;
  name: string;
  type: AssetType;
  icon?: string; // optional icon name for UI
  yaml: string;
};

export type AssetFolder = {
  id: string;
  name: string;
  assets: Asset[];
  folders?: AssetFolder[];
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
        // Shared folders with a random mix of asset types and uneven distribution
        {
          id: 'shared-root',
          name: 'Shared',
          assets: [
            { id: 'shared-1', name: 'Config: Global Settings', type: 'config', icon: 'Settings', yaml: 'type: config\nsettings:\n  global: true\n  version: 1.2.3\n  updated: 2025-09-14' },
            { id: 'shared-2', name: 'API: Healthcheck', type: 'api', icon: 'Server', yaml: 'type: api\nendpoint: /api/health\nmethod: GET\ndescription: Healthcheck endpoint' },
          ],
          folders: [
            {
              id: 'shared-views',
              name: 'Shared Views',
              assets: Array.from({ length: 7 }, (_, i) => {
                const layouts = ['grid', 'list', 'mosaic', 'kanban'];
                const layout = layouts[Math.floor(Math.random() * layouts.length)];
                const titles = ['Dashboard', 'Overview', 'Workspace', 'Board', 'Panel', 'Monitor', 'Console'];
                const title = titles[i % titles.length] + (Math.random() > 0.5 ? ` ${i+1}` : '');
                return {
                  id: `shared-view-${i+1}`,
                  name: `View: ${title}`,
                  type: 'view',
                  icon: 'Layout',
                  yaml: `type: view\ntitle: ${title}\nlayout: ${layout}\ncreated: 2025-09-${10+i}`,
                };
              }),
            },
            {
              id: 'shared-mixed',
              name: 'Mixed Assets',
              assets: [
                { id: 'shared-mix-1', name: 'Job: Nightly Sync', type: 'job', icon: 'Play', yaml: 'type: job\nname: Nightly Sync\nschedule: "0 2 * * *"\nowner: ops-team' },
                { id: 'shared-mix-2', name: 'Config: Feature Flags', type: 'config', icon: 'Settings', yaml: 'type: config\nsettings:\n  featureA: enabled\n  featureB: disabled' },
                { id: 'shared-mix-3', name: 'API: Data Import', type: 'api', icon: 'Server', yaml: 'type: api\nendpoint: /api/import\nmethod: POST\nnotes: Handles bulk data import' },
              ],
            },
          ],
        },
        // Team folders with random asset/folder distribution
        ...['Alice', 'Bob', 'Carol', 'Dave', 'Eve'].map((member, idx) => ({
          id: `team-${member.toLowerCase()}`,
          name: `${member}'s Folder`,
          assets: Array.from({ length: Math.floor(Math.random() * 6) + 2 }, (_, i) => {
            const types: AssetType[] = ['view', 'api', 'config', 'job'];
            const type = types[Math.floor(Math.random() * types.length)];
            const icon = type === 'view' ? 'Layout' : type === 'api' ? 'Server' : type === 'config' ? 'Settings' : 'Play';
            // Randomize names and yaml
            const namePrefixes = {
              view: ['UI', 'Panel', 'Board', 'Screen', 'Widget'],
              api: ['Endpoint', 'Service', 'API', 'Webhook'],
              config: ['Settings', 'Config', 'Profile', 'Env'],
              job: ['Task', 'Job', 'Worker', 'Process'],
            };
            const prefix = namePrefixes[type][Math.floor(Math.random() * namePrefixes[type].length)];
            const name = `${prefix} ${Math.floor(Math.random()*100)}`;
            let yaml = '';
            if (type === 'view') {
              const layouts = ['grid', 'list', 'mosaic'];
              yaml = `type: view\ntitle: ${name}\nlayout: ${layouts[Math.floor(Math.random()*layouts.length)]}\nowner: ${member}`;
            } else if (type === 'api') {
              const verbs = ['GET', 'POST', 'PUT', 'DELETE'];
              yaml = `type: api\nendpoint: /api/${member.toLowerCase()}/${name.replace(/\s/g,'-').toLowerCase()}\nmethod: ${verbs[Math.floor(Math.random()*verbs.length)]}\ndescription: Randomly generated API`;
            } else if (type === 'config') {
              yaml = `type: config\nsettings:\n  ${name.replace(/\s/g,'_').toLowerCase()}: true\n  updated: 2025-09-14`;
            } else {
              yaml = `type: job\nname: ${name}\nschedule: '${Math.floor(Math.random()*24)} ${Math.floor(Math.random()*60)} * * *'\nnotes: Random job for ${member}`;
            }
            return {
              id: `${member.toLowerCase()}-asset-${i+1}`,
              name,
              type,
              icon,
              yaml,
            };
          }),
          folders: [
            {
              id: `${member.toLowerCase()}-deep`,
              name: `${member}'s Deep Work`,
              assets: Array.from({ length: Math.floor(Math.random() * 5) + 2 }, (_, i) => {
                const types: AssetType[] = ['view', 'api', 'config', 'job'];
                const type = types[Math.floor(Math.random() * types.length)];
                const icon = type === 'view' ? 'Layout' : type === 'api' ? 'Server' : type === 'config' ? 'Settings' : 'Play';
                const name = `${member} ${['Alpha', 'Beta', 'Gamma', 'Delta'][Math.floor(Math.random()*4)]} ${type}`;
                let yaml = '';
                if (type === 'view') {
                  yaml = `type: view\ntitle: ${name}\nlayout: ${['grid','list'][Math.floor(Math.random()*2)]}`;
                } else if (type === 'api') {
                  yaml = `type: api\nendpoint: /api/${name.replace(/\s/g,'-').toLowerCase()}\nmethod: ${['GET','POST'][Math.floor(Math.random()*2)]}`;
                } else if (type === 'config') {
                  yaml = `type: config\nsettings:\n  ${name.replace(/\s/g,'_').toLowerCase()}: ${Math.random()>0.5?'true':'false'}`;
                } else {
                  yaml = `type: job\nname: ${name}\nschedule: '${Math.floor(Math.random()*24)} ${Math.floor(Math.random()*60)} * * *'`;
                }
                return {
                  id: `${member.toLowerCase()}-deep-asset-${i+1}`,
                  name,
                  type,
                  icon,
                  yaml,
                };
              }),
              folders: [
                {
                  id: `${member.toLowerCase()}-deepest`,
                  name: `${member}'s Deepest`,
                  assets: Array.from({ length: Math.floor(Math.random() * 4) + 2 }, (_, i) => {
                    const types: AssetType[] = ['view', 'api', 'config', 'job'];
                    const type = types[Math.floor(Math.random() * types.length)];
                    const icon = type === 'view' ? 'Layout' : type === 'api' ? 'Server' : type === 'config' ? 'Settings' : 'Play';
                    const name = `${member} Deepest ${['Spec', 'Doc', 'Run', 'Test'][Math.floor(Math.random()*4)]} ${type}`;
                    let yaml = '';
                    if (type === 'view') {
                      yaml = `type: view\ntitle: ${name}\nlayout: ${['mosaic','list','grid'][Math.floor(Math.random()*3)]}`;
                    } else if (type === 'api') {
                      yaml = `type: api\nendpoint: /api/${name.replace(/\s/g,'-').toLowerCase()}\nmethod: ${['GET','POST','PUT'][Math.floor(Math.random()*3)]}`;
                    } else if (type === 'config') {
                      yaml = `type: config\nsettings:\n  ${name.replace(/\s/g,'_').toLowerCase()}: ${Math.random()>0.5?'enabled':'disabled'}`;
                    } else {
                      yaml = `type: job\nname: ${name}\nschedule: '${Math.floor(Math.random()*24)} ${Math.floor(Math.random()*60)} * * *'`;
                    }
                    return {
                      id: `${member.toLowerCase()}-deepest-asset-${i+1}`,
                      name,
                      type,
                      icon,
                      yaml,
                    };
                  }),
                },
              ],
            },
          ],
        })),
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
            { id: 'b1', name: 'Job Runner', type: 'job', icon: 'Play', yaml: 'type: job\nname: Beta Job\nschedule: "0 0 * * *"\nscript: run.sh' },
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
        { id: 'g1', name: 'Gamma View', type: 'view', icon: 'Layout', yaml: 'type: view\ntitle: Gamma View\nlayout: list' },
        { id: 'g2', name: 'Gamma API', type: 'api', icon: 'Server', yaml: 'type: api\nendpoint: /api/gamma\nmethod: POST' },
      ],
    },
    // ...other packages remain unchanged for brevity...
    { id: '4', name: 'Delta', description: 'Delta package description.', lastAccessed: '2025-09-12T08:00:00Z', createdAt: '2025-08-15T13:00:00Z', favorited: false, assets: [] },
    { id: '5', name: 'Epsilon', description: 'Epsilon package description.', lastAccessed: '2025-09-08T19:30:00Z', createdAt: '2025-08-20T10:10:00Z', favorited: false, assets: [] },
    { id: '6', name: 'Zeta', description: 'Zeta package description.', lastAccessed: '2025-09-07T12:00:00Z', createdAt: '2025-08-25T08:45:00Z', favorited: true, assets: [
      { id: 'z1', name: 'Zeta Config', type: 'config', icon: 'Settings', yaml: 'type: config\nsettings:\n  zeta: true' },
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
