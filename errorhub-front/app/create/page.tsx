'use client';

import { Suspense } from 'react';
import CreateContent from './CreateContent';

export default function CreatePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-2xl text-center py-12">
          <p className="text-slate-600">読み込み中...</p>
        </div>
      </main>
    }>
      <CreateContent />
    </Suspense>
  );
}