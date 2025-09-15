export interface SandboxProps {
  files?: Record<string, { code: string }>;
  editorHeight?: string;
  className?: string;
}

import * as React from "react";
import MonacoEditor from "@monaco-editor/react";

export function Sandbox({ files }: SandboxProps) {
  // Get the first file and its code
  const fileEntry = files ? (Object.entries(files)[0] as [string, { code: string }] | undefined) : undefined;
  const fileName = fileEntry ? fileEntry[0] : "example.yaml";
  const code = fileEntry ? fileEntry[1].code : "# No YAML provided";
  const [value, setValue] = React.useState(code);

  // Update editor value when asset changes
  React.useEffect(() => {
    setValue(code);
  }, [code]);

  return (
    <div className="flex-1 min-h-0 min-w-0">
        <MonacoEditor
          key={fileName}
          height="100%"
          width="100%"
          defaultLanguage="yaml"
          value={value}
          onChange={v => setValue(v ?? "")}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
          }}
        />
      </div>
  );
}
