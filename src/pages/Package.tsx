
import { useParams } from 'react-router-dom';

export default function PackageDetail() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Package Detail Page</h2>
      <p>Details for package: <span className="font-mono">{id}</span></p>
    </div>
  );
}
