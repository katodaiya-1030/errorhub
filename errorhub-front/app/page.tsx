'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useErrorLogs } from './hooks/useErrorLogs';

export default function Home() {
  const { logs, fetchAll } = useErrorLogs();

  useEffect(() => {
    fetchAll();
  }, []);

  const languages = [...new Set(logs.map((log) => log.language))];
  const frameworks = [...new Set(logs.map((log) => log.framework).filter(Boolean))];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">ERROR HUB</h1>
          <p className="text-lg text-slate-600">エラーログを一元管理して、開発効率を向上させます</p>
        </header>

        {/* クイックアクション */}
        <section className="mb-12 grid gap-4 md:grid-cols-2">
          <Link
            href="/create"
            className="rounded-2xl border border-blue-200 bg-blue-50 p-8 text-center transition hover:bg-blue-100 hover:shadow-md"
          >
            <div className="text-4xl mb-2">📝</div>
            <h2 className="text-lg font-bold text-blue-700">新規登録</h2>
            <p className="mt-1 text-sm text-slate-600">エラーログを新規登録</p>
          </Link>

          <Link
            href="/list"
            className="rounded-2xl border border-slate-200 bg-white p-8 text-center transition hover:shadow-md"
          >
            <div className="text-4xl mb-2">📊</div>
            <h2 className="text-lg font-bold">一覧を見る</h2>
            <p className="mt-1 text-sm text-slate-600">登録済みエラーを検索・編集</p>
          </Link>
        </section>

        {/* 統計情報 */}
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6">統計情報</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {/* 合計エラー数 */}
            <div className="rounded-lg bg-blue-50 p-6 border border-blue-100">
              <div className="text-3xl font-bold text-blue-700">{logs.length}</div>
              <p className="mt-1 text-sm text-slate-600">登録済みエラー</p>
            </div>

            {/* 言語数 */}
            <div className="rounded-lg bg-purple-50 p-6 border border-purple-100">
              <div className="text-3xl font-bold text-purple-700">{languages.length}</div>
              <p className="mt-1 text-sm text-slate-600">使用言語</p>
              {languages.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {languages.slice(0, 3).map((lang) => (
                    <span key={lang} className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded">
                      {lang}
                    </span>
                  ))}
                  {languages.length > 3 && <span className="text-xs text-slate-600">+{languages.length - 3}</span>}
                </div>
              )}
            </div>

            {/* フレームワーク数 */}
            <div className="rounded-lg bg-green-50 p-6 border border-green-100">
              <div className="text-3xl font-bold text-green-700">{frameworks.length}</div>
              <p className="mt-1 text-sm text-slate-600">使用フレームワーク</p>
              {frameworks.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {frameworks.slice(0, 3).map((fw) => (
                    <span key={fw} className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">
                      {fw}
                    </span>
                  ))}
                  {frameworks.length > 3 && <span className="text-xs text-slate-600">+{frameworks.length - 3}</span>}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}