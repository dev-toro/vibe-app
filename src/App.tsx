import { Button } from '@/components/ui/button';

function App() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 min-h-screen">
      <h1 className="text-3-5xl font-bold">Vite + React + Shadcn UI</h1>
      <Button>Primary Buttonsss</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="destructive">Destructive Button</Button>
    </div>
  );
}

export default App;