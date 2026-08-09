'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useErrorForm } from '../hooks/useErrorForm';
import { useErrorLogs } from '../hooks/useErrorLogs';

const inputClassName =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100';

const errorInputClassName =
  'w-full rounded-lg border border-red-500 bg-red-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-600 focus:ring-4 focus:ring-red-100';

export default function CreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  const { form, error, fieldErrors, loading, updateField, resetForm, loadFromLog, submit } = useErrorForm();
  const { getErrorById } = useErrorLogs();
  const [isLoading, setIsLoading] = useState(!!editId);

  // 編集モード：既存データをロード
  useEffect(() => {
    if (editId) {
      getErrorById(Number(editId)).then((log) => {
        if (log) {
          loadFromLog(log);
        }
        setIsLoading(false);
      });
    }
  }, [editId]);

  const handleSubmit = async () => {
    const success = await submit(editId ? Number(editId) : undefined);
    if (success) {
      router.push('/list');
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-2xl text-center py-12">
          <p className="text-slate-600">読み込み中...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {editId ? 'エラーログを編集' : 'エラーログを登録'}
          </h1>
          <p className="text-slate-600">
            {editId ? '内容を変更して更新してください。' : '必須項目を入力して記録を追加してください。'}
          </p>
        </header>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
            {error}
          </div>
        )}

        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-6 md:grid-cols-2">
            {/* エラー名 */}
            <label className="text-sm font-medium text-slate-700">
              エラー名 <span className="text-red-500">*</span>
              <input
                className={fieldErrors.errorName ? errorInputClassName : inputClassName}
                value={form.errorName}
                onChange={(e) => updateField('errorName', e.target.value)}
                placeholder="例: NullPointerException"
              />
              {fieldErrors.errorName && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.errorName}</p>
              )}
            </label>

            {/* メッセージ */}
            <label className="text-sm font-medium text-slate-700">
              メッセージ <span className="text-red-500">*</span>
              <input
                className={fieldErrors.errorMessage ? errorInputClassName : inputClassName}
                value={form.errorMessage}
                onChange={(e) => updateField('errorMessage', e.target.value)}
                placeholder="エラーの内容"
              />
              {fieldErrors.errorMessage && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.errorMessage}</p>
              )}
            </label>

            {/* 言語 */}
            <label className="text-sm font-medium text-slate-700">
              言語 <span className="text-red-500">*</span>
              <input
                className={fieldErrors.language ? errorInputClassName : inputClassName}
                value={form.language}
                onChange={(e) => updateField('language', e.target.value)}
                placeholder="例: Java"
              />
              {fieldErrors.language && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.language}</p>
              )}
            </label>

            {/* フレームワーク */}
            <label className="text-sm font-medium text-slate-700">
              フレームワーク
              <input
                className={fieldErrors.framework ? errorInputClassName : inputClassName}
                value={form.framework}
                onChange={(e) => updateField('framework', e.target.value)}
                placeholder="例: Spring Boot"
              />
              {fieldErrors.framework && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.framework}</p>
              )}
            </label>

            {/* 原因 */}
            <label className="text-sm font-medium text-slate-700 md:col-span-2">
              原因
              <textarea
                className={fieldErrors.cause ? errorInputClassName + ' min-h-20 resize-y' : inputClassName + ' min-h-20 resize-y'}
                value={form.cause}
                onChange={(e) => updateField('cause', e.target.value)}
                placeholder="エラーが起きた原因"
              />
              {fieldErrors.cause && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.cause}</p>
              )}
            </label>

            {/* 解決方法 */}
            <label className="text-sm font-medium text-slate-700 md:col-span-2">
              解決方法 <span className="text-red-500">*</span>
              <input
                className={fieldErrors.solution ? errorInputClassName : inputClassName}
                value={form.solution}
                onChange={(e) => updateField('solution', e.target.value)}
                placeholder="対応方法"
              />
              {fieldErrors.solution && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.solution}</p>
              )}
            </label>

            {/* 再発防止策 */}
            <label className="text-sm font-medium text-slate-700 md:col-span-2">
              再発防止策
              <textarea
                className={fieldErrors.prevention ? errorInputClassName + ' min-h-20 resize-y' : inputClassName + ' min-h-20 resize-y'}
                value={form.prevention}
                onChange={(e) => updateField('prevention', e.target.value)}
                placeholder="再発を防ぐための対応"
              />
              {fieldErrors.prevention && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.prevention}</p>
              )}
            </label>

            {/* スタックトレース */}
            <label className="text-sm font-medium text-slate-700 md:col-span-2">
              スタックトレース
              <textarea
                className={fieldErrors.stackTrace ? errorInputClassName + ' min-h-28 resize-y font-mono text-xs' : inputClassName + ' min-h-28 resize-y font-mono text-xs'}
                value={form.stackTrace}
                onChange={(e) => updateField('stackTrace', e.target.value)}
                placeholder="スタックトレース（任意）"
              />
              {fieldErrors.stackTrace && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.stackTrace}</p>
              )}
            </label>
          </div>

          {/* ボタン */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? '処理中...' : editId ? '更新する' : '登録する'}
            </button>

            <Link
              href="/list"
              className="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
            >
              キャンセル
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}