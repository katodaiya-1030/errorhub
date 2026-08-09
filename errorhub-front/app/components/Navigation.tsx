'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-sm font-semibold tracking-wide text-blue-600">ERROR HUB</div>
          </Link>
          
          <div className="flex gap-4">
            <Link
              href="/"
              className={`px-4 py-2 text-sm font-medium transition rounded-lg ${
                isActive('/') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              ホーム
            </Link>
            <Link
              href="/create"
              className={`px-4 py-2 text-sm font-medium transition rounded-lg ${
                isActive('/create')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              登録
            </Link>
            <Link
              href="/list"
              className={`px-4 py-2 text-sm font-medium transition rounded-lg ${
                isActive('/list')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              一覧
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}