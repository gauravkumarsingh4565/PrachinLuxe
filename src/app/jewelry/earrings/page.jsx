import { Suspense } from 'react';
import EarringItem from '@/views/Jewelry/EarringItem';

export default function EarringsPage() {
  return (
    <main>
      <Suspense fallback={
        <div className="w-full min-h-screen bg-sand-100 flex items-center justify-center font-cormorant text-xl text-royal-blue-900">
          Loading collection...
        </div>
      }>
        <EarringItem />
      </Suspense>
    </main>
  );
}
