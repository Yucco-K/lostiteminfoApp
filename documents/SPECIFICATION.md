# おとしものインフォメーション 仕様書

## 1. システム概要

おとしものインフォメーションは、習い事や塾での子どもの忘れ物管理を効率化するための Web アプリケーションです。

## 2. 技術スタック

### 2.1 フロントエンド

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React

### 2.2 バックエンド

- Supabase (BaaS)
  - 認証
  - データベース
  - ストレージ

### 2.3 インフラストラクチャ

- Vercel (クラウドホスティング)
- GitHub (バージョン管理)

### 2.4 開発環境

- Node.js
- npm
- Git

## 2. 機能要件

### 2.1 ユーザー管理

- ユーザー登録・ログイン機能
  - Google アカウントによる認証
  - 管理者/一般ユーザーの権限管理

### 2.2 忘れ物情報管理

- 忘れ物情報の投稿
  - 写真添付
  - 発見日時・場所の記録
  - コメント・備考欄の追加
- 忘れ物情報の編集・削除
- 解決済み/未解決のステータス管理
- 非表示設定

### 2.3 検索・フィルタリング

- キーワード検索
- 日付範囲での絞り込み
- 解決状況でのフィルタリング

## 3. API 仕様

### 3.1 認証関連

```typescript
// Google認証開始
GET / api / auth / google;
Response: {
	redirectUrl: string; // Google認証ページへのリダイレクトURL
}

// Google認証コールバック
GET / api / auth / callback;
Query: {
	code: string; // Googleからの認証コード
}
Response: {
	session: Session;
	user: User;
}

// ログアウト
POST / api / auth / logout;
Response: {
	success: boolean;
}
```

### 3.2 投稿関連

```typescript
// 投稿一覧取得
GET /api/posts
Query: {
  search?: string
  resolved?: boolean
  hidden?: boolean
  page?: number
  limit?: number
}
Response: {
  posts: Post[]
  total: number
}

// 投稿詳細取得
GET /api/posts/:id
Response: {
  post: Post
}

// 新規投稿作成
POST /api/posts
Request: {
  lostitem_name: string
  find_date: string
  find_time: string
  find_place: string
  comment: string
  file?: File
}
Response: {
  post: Post
}

// 投稿更新
PUT /api/posts/:id
Request: {
  lostitem_name?: string
  find_date?: string
  find_time?: string
  find_place?: string
  comment?: string
  resolved?: boolean
  hidden?: boolean
  remarks_column?: string
}
Response: {
  post: Post
}
```

### 3.3 ファイル関連

```typescript
// ファイルアップロード
POST /api/files
Request: FormData {
  file: File
}
Response: {
  file_url: string
}
```

## 4. データベース設計

詳細は[ERD 図](./ERD.md)を参照してください。

## 5. セキュリティ要件

- ユーザー認証の必須化
- 管理者権限による操作制限
- ファイルアップロードの制限
  - 最大ファイルサイズ: 5MB

## 6. 非機能要件

- レスポンス時間: ページ表示 2 秒以内
