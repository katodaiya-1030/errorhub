'use client';

import { useEffect, useState } from 'react';

type ErrorLog = {
  id: number;
  errorName: string;
  errorMessage: string;
  stackTrace: string;
  cause: string;
  solution: string;
  prevention: string;
  language: string;
  framework: string;
  createdAt: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/errors';

const inputClassName =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100';

export default function Home() {
  const [logs, setLogs] = useState<ErrorLog[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [requestError, setRequestError] = useState('');
  const [errorName, setErrorName] = useState('');
  const [message, setMessage] = useState('');
  const [stackTrace, setStackTrace] = useState('');
  const [cause, setCause] = useState('');
  const [solution, setSolution] = useState('');
  const [prevention, setPrevention] = useState('');
  const [language, setLanguage] = useState('');
  const [framework, setFramework] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    fetchAll();
  }, []);

  function fetchAll() {
    setRequestError('');
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('一覧の取得に失敗しました。');
        return res.json();
      })
      .then((data) => setLogs(data))
      .catch((error: Error) => setRequestError(error.message));
  }

  function resetForm() {
    setEditingId(null);
    setErrorName('');
    setMessage('');
    setStackTrace('');
    setCause('');
    setSolution('');
    setPrevention('');
    setLanguage('');
    setFramework('');
  }

  function handleEdit(log: ErrorLog) {
    setEditingId(log.id);
    setErrorName(log.errorName);
    setMessage(log.errorMessage);
    setStackTrace(log.stackTrace ?? '');
    setCause(log.cause ?? '');
    setSolution(log.solution);
    setPrevention(log.prevention ?? '');
    setLanguage(log.language);
    setFramework(log.framework ?? '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSubmit() {
    setRequestError('');
    const isEditing = editingId !== null;

    try {
      const response = await fetch(isEditing ? `${API_URL}/${editingId}` : API_URL, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ errorName, errorMessage: message, stackTrace, cause, solution, prevention, language, framework }),
      });

      if (!response.ok) {
        throw new Error(isEditing ? 'エラーログの更新に失敗しました。' : 'エラーログの登録に失敗しました。');
      }

      resetForm();
      fetchAll();
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : '処理に失敗しました。');
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm('このエラーログを削除しますか？この操作は元に戻せません。')) return;

    setDeletingId(id);
    setRequestError('');
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('削除に失敗しました。');
      if (editingId === id) resetForm();
      setLogs((currentLogs) => currentLogs.filter((log) => log.id !== id));
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : '削除に失敗しました。');
    } finally {
      setDeletingId(null);
    }
  }

  function handleSearch() {
    if (!keyword.trim()) {
      fetchAll();
      return;
    }

    setRequestError('');
    fetch(`${API_URL}/search?${new URLSearchParams({ keyword: keyword.trim() })}`)
      .then((res) => {
        if (!res.ok) throw new Error('検索に失敗しました。');
        return res.json();
      })
      .then((data) => setLogs(data))
      .catch((error: Error) => setRequestError(error.message));
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-3 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold tracking-wide text-blue-600">ERROR HUB</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">エラーログ管理</h1>
            <p className="mt-2 text-sm text-slate-600">発生したエラーと解決方法を記録・検索できます。</p>
          </div>
          <span className="w-fit rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">{logs.length} 件</span>
        </header>

        {requestError && (
          <p role="alert" className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {requestError}
          </p>
        )}

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold">{editingId !== null ? 'エラーログを編集' : 'エラーログを登録'}</h2>
              <p className="mt-1 text-sm text-slate-500">{editingId !== null ? '内容を変更して更新してください。' : '必須項目を入力して記録を追加してください。'}</p>
            </div>
            {editingId !== null && <span className="rounded-md bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">編集中</span>}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">エラー名<input className={inputClassName} value={errorName} onChange={(e) => setErrorName(e.target.value)} placeholder="例: NullPointerException" /></label>
            <label className="text-sm font-medium text-slate-700">メッセージ<input className={inputClassName} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="エラーの内容" /></label>
            <label className="text-sm font-medium text-slate-700">言語<input className={inputClassName} value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="例: Java" /></label>
            <label className="text-sm font-medium text-slate-700">フレームワーク<input className={inputClassName} value={framework} onChange={(e) => setFramework(e.target.value)} placeholder="例: Spring Boot" /></label>
            <label className="text-sm font-medium text-slate-700 md:col-span-2">原因<textarea className={`${inputClassName} min-h-20 resize-y`} value={cause} onChange={(e) => setCause(e.target.value)} placeholder="エラーが起きた原因" /></label>
            <label className="text-sm font-medium text-slate-700 md:col-span-2">解決方法<input className={inputClassName} value={solution} onChange={(e) => setSolution(e.target.value)} placeholder="対応方法" /></label>
            <label className="text-sm font-medium text-slate-700 md:col-span-2">再発防止策<textarea className={`${inputClassName} min-h-20 resize-y`} value={prevention} onChange={(e) => setPrevention(e.target.value)} placeholder="再発を防ぐための対応" /></label>
            <label className="text-sm font-medium text-slate-700 md:col-span-2">スタックトレース<textarea className={`${inputClassName} min-h-28 resize-y font-mono text-xs`} value={stackTrace} onChange={(e) => setStackTrace(e.target.value)} placeholder="スタックトレース（任意）" /></label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={handleSubmit} className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200">
              {editingId !== null ? '更新する' : '登録する'}
            </button>
            {editingId !== null && <button type="button" onClick={resetForm} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100">キャンセル</button>}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 className="text-lg font-bold">登録済みエラー</h2><p className="mt-1 text-sm text-slate-500">キーワードから横断検索できます。</p></div>
            <div className="flex w-full gap-2 sm:w-auto">
              <input className={inputClassName} value={keyword} onChange={(e) => setKeyword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} placeholder="エラー名・言語などで検索" />
              <button type="button" onClick={handleSearch} className="shrink-0 rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700">検索</button>
            </div>
          </div>

          {logs.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-sm text-slate-500">該当するエラーログはありません。</div>
          ) : (
            <div className="grid gap-4">
              {logs.map((log) => (
                <article key={log.id} className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-300 hover:shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="break-words text-lg font-bold">{log.errorName}</h3><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{log.language}</span>{log.framework && <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{log.framework}</span>}</div><p className="mt-2 break-words text-sm text-slate-600">{log.errorMessage}</p></div>
                    <div className="flex shrink-0 gap-2"><button type="button" onClick={() => handleEdit(log)} className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-bold text-blue-700 transition hover:bg-blue-100">編集</button><button type="button" onClick={() => handleDelete(log.id)} disabled={deletingId === log.id} className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50">{deletingId === log.id ? '削除中…' : '削除'}</button></div>
                  </div>
                  <dl className="mt-5 grid gap-4 border-t border-slate-100 pt-4 text-sm md:grid-cols-2"><div><dt className="font-semibold text-slate-500">原因</dt><dd className="mt-1 whitespace-pre-wrap break-words text-slate-700">{log.cause || '未登録'}</dd></div><div><dt className="font-semibold text-slate-500">解決方法</dt><dd className="mt-1 whitespace-pre-wrap break-words text-slate-700">{log.solution}</dd></div><div><dt className="font-semibold text-slate-500">再発防止策</dt><dd className="mt-1 whitespace-pre-wrap break-words text-slate-700">{log.prevention || '未登録'}</dd></div><div><dt className="font-semibold text-slate-500">作成日時</dt><dd className="mt-1 text-slate-700">{log.createdAt ? new Date(log.createdAt).toLocaleString('ja-JP') : '未登録'}</dd></div>{log.stackTrace && <div className="md:col-span-2"><dt className="font-semibold text-slate-500">スタックトレース</dt><dd className="mt-1 overflow-x-auto rounded-lg bg-slate-950 p-3 font-mono text-xs text-slate-100">{log.stackTrace}</dd></div>}</dl>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}