'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useErrorLogs } from '../hooks/useErrorLogs';

export default function ListPage() {
  const { logs, error, loading, totalPages, currentPage, fetchAll, searchByKeyword, deleteError } = useErrorLogs();
  const [keyword, setKeyword] = useState('');
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
  const [searchMode, setSearchMode] = useState(false);

  useEffect(() => {
    fetchAll(0);
  }, []);

  const handleSearch = () => {
    if (!keyword.trim()) {
      setSearchMode(false);
      fetchAll(0);
      return;
    }
    setSearchMode(true);
    searchByKeyword(keyword.trim(), 0);
  };

  const handlePageChange = (page: number) => {
    if (searchMode) {
      searchByKeyword(keyword.trim(), page);
    } else {
      fetchAll(page);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('このエラーログを削除しますか？この操作は元に戻せません。')) return;

    setDeletingIds((prev) => new Set([...prev, id]));
    await deleteError(id);
    setDeletingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  // ページネーション用の配列を生成
  const pageNumbers = [];
  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">登録済みエラー</h1>
          <p className="text-slate-600">キーワードから横断検索できます。</p>
        </header>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
            {error}
          </div>
        )}

        {/* 検索バー */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="エラー名・言語などで検索"
              className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
            <button
              onClick={handleSearch}
              className="rounded-lg bg-slate-800 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700"
            >
              検索
            </button>
            <Link
              href="/create"
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              新規登録
            </Link>
          </div>
        </section>

        {/* エラーリスト */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {loading && logs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600">読み込み中...</p>
            </div>
          ) : logs.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-sm text-slate-500">
              該当するエラーログはありません。
            </div>
          ) : (
            <>
              <div className="grid gap-4 mb-6">
                {logs.map((log) => (
                  <article
                    key={log.id}
                    className={`rounded-xl border border-slate-200 p-5 transition ${
                      deletingIds.has(log.id) ? 'opacity-50 pointer-events-none' : 'hover:border-blue-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="break-words text-lg font-bold">{log.errorName}</h3>
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                            {log.language}
                          </span>
                          {log.framework && (
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                              {log.framework}
                            </span>
                          )}
                        </div>
                        <p className="break-words text-sm text-slate-600">{log.errorMessage}</p>
                      </div>

                      <div className="flex shrink-0 gap-2">
                        <Link
                          href={`/create?id=${log.id}`}
                          className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed"
                        >
                          編集
                        </Link>
                        <button
                          onClick={() => handleDelete(log.id)}
                          disabled={deletingIds.has(log.id)}
                          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingIds.has(log.id) ? '削除中…' : '削除'}
                        </button>
                      </div>
                    </div>

                    <dl className="mt-5 grid gap-4 border-t border-slate-100 pt-4 text-sm md:grid-cols-2">
                      <div>
                        <dt className="font-semibold text-slate-500">原因</dt>
                        <dd className="mt-1 whitespace-pre-wrap break-words text-slate-700">
                          {log.cause || '未登録'}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-500">解決方法</dt>
                        <dd className="mt-1 whitespace-pre-wrap break-words text-slate-700">
                          {log.solution}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-500">再発防止策</dt>
                        <dd className="mt-1 whitespace-pre-wrap break-words text-slate-700">
                          {log.prevention || '未登録'}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-slate-500">作成日時</dt>
                        <dd className="mt-1 text-slate-700">
                          {log.createdAt ? new Date(log.createdAt).toLocaleString('ja-JP') : '未登録'}
                        </dd>
                      </div>
                      {log.stackTrace && (
                        <div className="md:col-span-2">
                          <dt className="font-semibold text-slate-500">スタックトレース</dt>
                          <dd className="mt-1 overflow-x-auto rounded-lg bg-slate-950 p-3 font-mono text-xs text-slate-100">
                            {log.stackTrace}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </article>
                ))}
              </div>

              {/* ページネーション */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6 border-t border-slate-100">
                  <button
                    onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    前へ
                  </button>

                  {pageNumbers.map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'border border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {page + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
                    disabled={currentPage === totalPages - 1}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    次へ
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}