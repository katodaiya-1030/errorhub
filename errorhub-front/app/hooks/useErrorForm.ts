import { useState } from 'react';
import { ErrorLog } from './useErrorLogs';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080/api/errors';

export type FormData = {
  errorName: string;
  errorMessage: string;
  stackTrace: string;
  cause: string;
  solution: string;
  prevention: string;
  language: string;
  framework: string;
};

export type FormErrors = Partial<Record<keyof FormData, string>>;

// 文字数制限
const MAX_LENGTHS = {
  errorName: 255,
  errorMessage: 500,
  stackTrace: 10000,
  cause: 2000,
  solution: 1000,
  prevention: 2000,
  language: 100,
  framework: 100,
};

// 必須フィールド
const REQUIRED_FIELDS: (keyof FormData)[] = ['errorName', 'errorMessage', 'solution', 'language'];

export function useErrorForm() {
  const [form, setForm] = useState<FormData>({
    errorName: '',
    errorMessage: '',
    stackTrace: '',
    cause: '',
    solution: '',
    prevention: '',
    language: '',
    framework: '',
  });

  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // フィールド入力時にそのフィールドのエラーをクリア
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    // 必須フィールドチェック
    REQUIRED_FIELDS.forEach((field) => {
      if (!form[field] || form[field].trim() === '') {
        errors[field] = `${field} は必須です`;
      }
    });

    // 文字数制限チェック
    (Object.keys(form) as (keyof FormData)[]).forEach((field) => {
      if (form[field] && form[field].length > MAX_LENGTHS[field]) {
        errors[field] = `${field} は${MAX_LENGTHS[field]}文字以内で入力してください`;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError('入力内容を確認してください');
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setForm({
      errorName: '',
      errorMessage: '',
      stackTrace: '',
      cause: '',
      solution: '',
      prevention: '',
      language: '',
      framework: '',
    });
    setError('');
    setFieldErrors({});
  };

  const loadFromLog = (log: ErrorLog) => {
    setForm({
      errorName: log.errorName,
      errorMessage: log.errorMessage,
      stackTrace: log.stackTrace ?? '',
      cause: log.cause ?? '',
      solution: log.solution,
      prevention: log.prevention ?? '',
      language: log.language,
      framework: log.framework ?? '',
    });
    setError('');
    setFieldErrors({});
  };

  const submit = async (id?: number): Promise<boolean> => {
    // クライアント側の検証
    if (!validateForm()) {
      return false;
    }

    setError('');
    setFieldErrors({});
    setLoading(true);

    try {
      const method = id ? 'PUT' : 'POST';
      const url = id ? `${API_URL}/${id}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();

        // バリデーションエラー（400）
        if (res.status === 400 && errorData.errors) {
          setFieldErrors(errorData.errors);
          setError(errorData.message || '入力内容に問題があります。');
          return false;
        }

        // その他のエラー
        setError(errorData.message || (id ? '更新に失敗しました。' : '登録に失敗しました。'));
        return false;
      }

      resetForm();
      return true;
    } catch (err) {
      setError('通信エラーが発生しました。');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { form, error, fieldErrors, loading, updateField, resetForm, loadFromLog, submit, setError };
}