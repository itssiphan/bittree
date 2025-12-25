import { Suspense } from 'react';
import GenerateContent from './GenerateContent';

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Generate Page</h1>

      <p className="mb-6 text-gray-600">
        Ye page practice ke liye hai. Query params se content generate kar rahe hain.
      </p>

      <Suspense fallback={<div className="text-center py-10">Loading parameters...</div>}>
        <GenerateContent />
      </Suspense>
    </div>
  );
}
