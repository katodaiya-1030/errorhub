import { useState } from 'react';

export type ErrorLog = {
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

export type PaginatedResponse = {
  content: ErrorLog[];
  totalPages: number;
  currentPage: number;
  totalElements: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/errors';

export function useErrorLogs() {
  const [logs, setLogs] = useState<ErrorLog[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const fetchAll = async (page: number = 0) => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}?page=${page}`);
      if (!res.ok) throw new Error('一覧の取得に失敗しました。');
      const data = await res.json();
      setLogs(data.content || []);
      setTotalPages(data.totalPages || 0);
      setCurrentPage(data.number || 0);
      setTotalElements(data.totalElements || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : '通信エラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };

  const searchByKeyword = async (keyword: string, page: number = 0) => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/search?${new URLSearchParams({ keyword, page: page.toString() })}`
      );
      if (!res.ok) throw new Error('検索に失敗しました。');
      const data = await res.json();
      setLogs(data.content || []);
      setTotalPages(data.totalPages || 0);
      setCurrentPage(data.number || 0);
      setTotalElements(data.totalElements || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : '検索エラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };

  const deleteError = async (id: number) => {
    setError('');
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('削除に失敗しました。');
      setLogs((prev) => prev.filter((log) => log.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : '削除エラーが発生しました。');
    }
  };

  const getErrorById = async (id: number): Promise<ErrorLog | null> => {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  };

  return {
    logs,
    error,
    loading,
    totalPages,
    currentPage,
    totalElements,
    fetchAll,
    searchByKeyword,
    deleteError,
    getErrorById,
    setError,
  };
}