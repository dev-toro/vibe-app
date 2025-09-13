export interface SandboxProps {
  files?: Record<string, { code: string }>;
  editorHeight?: string;
  className?: string;
}

import MonacoEditor from "@monaco-editor/react";

export function Sandbox({ files, editorHeight = "400px", className }: SandboxProps) {
  // Get the first file and its code
  const fileEntry = files ? (Object.entries(files)[0] as [string, { code: string }] | undefined) : undefined;
  const fileName = fileEntry ? fileEntry[0] : "example.yaml";
  const code = fileEntry ? fileEntry[1].code : "# No YAML provided";

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        minHeight: 0,
        minWidth: 0,
        background: '#18181b',
        color: '#fff',
        borderRadius: 8,
        border: '1px solid #e5e7eb',
      }}
    >
      <header
        style={{
          fontWeight: 600,
          fontSize: 18,
          padding: '16px 24px',
          borderBottom: '1px solid #23232b',
          background: '#1e1e23',
          letterSpacing: 0.5,
        }}
      >
        {fileName}
      </header>
      <div style={{ flex: 1, minHeight: 0, minWidth: 0 }}>
        <MonacoEditor
          height="100%"
          width="100%"
          defaultLanguage="yaml"
          defaultValue={code}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}
