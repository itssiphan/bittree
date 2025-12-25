// app/generate/page.tsx  (or page.jsx)
import { Suspense } from 'react';
import GenerateContent from './GenerateContent';

export default function GeneratePage({ 
  searchParams 
}: { 
  searchParams: { handle?: string } 
}) {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <GenerateContent initialHandle={searchParams.handle || ''} />
    </Suspense>
  );
}
