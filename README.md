# ERROR HUB

エラーログを一元管理できる Full Stack ポートフォリオアプリケーション。
発生したエラーと解決方法、再発防止策を記録・検索できます。

**🌐 デモ：** https://errorhub-self.vercel.app

---

## 📋 機能

- ✅ エラー情報の新規登録・編集・削除
- ✅ キーワード検索（言語、フレームワーク、エラー内容で横断検索）
- ✅ ページネーション（1ページ 10 件表示）
- ✅ リアルタイムバリデーション（フロント + バック）
- ✅ 統計情報表示（登録済みエラー数、使用言語、フレームワーク）

---

## 🛠️ 技術スタック

### フロントエンド
- **Framework:** Next.js 16.2.11
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI State:** React Hooks
- **Hosting:** Vercel

### バックエンド
- **Framework:** Spring Boot 4.1.0
- **Language:** Java 21
- **ORM:** Spring Data JPA (Hibernate 7.4.1)
- **Database:** MySQL
- **Validation:** Jakarta Bean Validation
- **CORS:** Spring Web Config

---

## 📦 API エンドポイント

| メソッド | エンドポイント | 説明 |
|---------|-------------|------|
| `GET` | `/api/errors?page=0` | エラー一覧取得（ページング） |
| `GET` | `/api/errors/{id}` | エラー詳細取得 |
| `GET` | `/api/errors/search?keyword=Java&page=0` | キーワード検索 |
| `POST` | `/api/errors` | エラー新規登録 |
| `PUT` | `/api/errors/{id}` | エラー情報更新 |
| `DELETE` | `/api/errors/{id}` | エラー削除 |

---

## ✨ 特徴

### 1. 詳細なエラーハンドリング
- バリデーションエラーをフィールドごとに表示
- 500 エラー時にサーバーログを記録
- ユーザーフレンドリーなエラーメッセージ

### 2. 堅牢な入力検証
- フロント側：即座にバリデーション
- バック側：入力値の最大文字数制限
  - エラー名：255 文字
  - メッセージ：500 文字
  - スタックトレース：10000 文字

### 3. UI/UX 改善
- 送信中の二重送信防止
- 削除中の視覚的フィードバック
- 統計情報で登録状況を一目で把握
- レスポンシブデザイン

### 4. アーキテクチャ設計
- **DTO パターン：** Entity と API の責務分離
- **カスタム例外処理：** GlobalExceptionHandler で統一管理
- **ページネーション：** Spring Data の Pageable で効率的に実装
- **CORS 設定：** WebConfig で環境変数対応

---

## 🚀 セットアップ

### 前提条件
- Java 21
- Node.js 18+
- MySQL 8.0+

### バックエンド

```bash
cd errorhub-back

# MySQL に接続して DB を作成
mysql -u root -p
> CREATE DATABASE errorhub;

# 設定ファイルを編集
# src/main/resources/application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/errorhub
spring.datasource.username=root
spring.datasource.password=your_password

# サーバー起動
./mvnw spring-boot:run
```

サーバーは `http://localhost:8080` で起動します。

### フロントエンド

```bash
cd errorhub-front

# 環境変数設定
echo "NEXT_PUBLIC_API_URL=http://localhost:8080/api/errors" > .env.local

# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev
```

フロントは `http://localhost:3000` で起動します。

---

## 📊 ディレクトリ構造

### バックエンド

```
errorhub-back/
├── src/main/java/com/example/errorhub/
│   ├── controller/        # API エンドポイント
│   ├── service/           # ビジネスロジック
│   ├── repository/        # DB アクセス層
│   ├── entity/            # JPA エンティティ
│   ├── dto/               # API リクエスト/レスポンス
│   ├── exception/         # 例外処理
│   └── config/            # CORS 設定
└── pom.xml
```

### フロントエンド

```
errorhub-front/
├── app/
│   ├── page.tsx           # ホーム画面
│   ├── create/page.tsx    # 登録・編集画面
│   ├── list/page.tsx      # 一覧画面
│   ├── components/        # 共通コンポーネント
│   └── hooks/             # カスタムフック
└── package.json
```

---

## 🧪 テスト手順

1. **ホーム画面** で統計情報を確認
2. **登録画面** で新規エラーを登録
   - 必須項目を空にして送信 → バリデーションエラー表示
   - 1000 文字以上のテキストを入力 → 文字数エラー表示
3. **一覧画面** で登録したエラーを確認
4. **検索機能** でキーワード検索
5. **編集機能** でエラー情報を修正
6. **削除機能** でエラーを削除
7. **ページネーション** で複数ページを移動

---

## 📝 学習ポイント

このプロジェクトで実装した技術：

- ✅ Full Stack 開発（フロント + バック）
- ✅ TypeScript での型安全な React 開発
- ✅ Java Spring Boot での REST API 設計
- ✅ DTO パターンによる責務分離
- ✅ バリデーション（フロント + バック）
- ✅ 例外処理とログ出力
- ✅ ページネーション実装
- ✅ CORS 設定と環境変数管理
- ✅ Git ワークフロー

---

## 📧 お問い合わせ

このプロジェクトについてのご質問や案件のご依頼は、[GitHub Issues](https://github.com/katodaiya-1030/errorhub/issues) までお願いします。

---

**Last Updated:** 2026-08-10