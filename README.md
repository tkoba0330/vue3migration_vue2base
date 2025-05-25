# Nuxt v2 → v3 マイグレーション試験プロジェクト

このプロジェクトは、Nuxt v2.18.1 から Nuxt v3.15.2 へのマイグレーションを試験するためのベースプロジェクトです。

## 📋 プロジェクト概要

- **目的**: Nuxt v2 から Nuxt v3 へのマイグレーション手順の検証
- **現在のバージョン**: Nuxt v2.18.1 + Vue v2
- **移行先バージョン**: Nuxt v3.15.2 + Vue v3
- **実行環境**: Docker & Docker Compose

## 🚀 セットアップ

### 前提条件
- Docker 20.x 以上
- Docker Compose 2.x 以上

### Docker環境での実行
```bash
# Docker Composeでコンテナを起動
docker-compose up -d

# 開発サーバーの起動（ホットリロード有効）
docker-compose exec nuxt npm run dev

# または、一括で起動
docker-compose up
```

### 個別Dockerコマンド
```bash
# Dockerイメージのビルド
docker build -t nuxt-migration-test .

# コンテナの起動
docker run -p 3000:3000 -v $(pwd):/app nuxt-migration-test

# 開発モードでの起動（ボリュームマウント）
docker run -p 3000:3000 -v $(pwd):/app -it nuxt-migration-test npm run dev
```

## 📁 プロジェクト構造（Nuxt v2 ベース）

```
vue3migration_vue2base/
├── assets/              # コンパイルされていないアセット
├── components/          # Vue.jsコンポーネント
├── layouts/             # レイアウトファイル
├── middleware/          # ミドルウェア
├── pages/               # ページコンポーネント（ルーティング）
├── plugins/             # プラグイン
├── static/              # 静的ファイル（Nuxt v3では public/ に変更）
├── store/               # Vuexストア（Nuxt v3では Pinia 推奨）
├── nuxt.config.js       # Nuxt設定ファイル
├── package.json         # 依存関係
├── Dockerfile           # Docker設定ファイル
├── docker-compose.yml   # Docker Compose設定
└── .dockerignore        # Docker除外ファイル
```

## 🔄 マイグレーション計画

### 1. 主要な変更点

#### フレームワーク変更
- **Vue 2 → Vue 3**: Composition API、script setup の導入
- **Webpack 4 → Vite**: ビルドツールの変更
- **Vuex → Pinia**: 状態管理ライブラリの変更

#### 設定ファイル変更
- `nuxt.config.js` → `nuxt.config.ts` (TypeScript推奨)
- `defineNuxtConfig()` 関数の使用
- ESM構文への移行

#### ディレクトリ構造変更
- `static/` → `public/`
- `buildModules` → `modules` に統合

### 2. マイグレーション手順

#### Phase 1: 環境準備
1. Docker環境の構築
2. TypeScript設定の追加
3. 依存関係の更新

#### Phase 2: 設定ファイル移行
1. `nuxt.config.js` の `defineNuxtConfig` への変更
2. ESM構文への移行
3. モジュール設定の更新

#### Phase 3: コンポーネント移行
1. Vue 3 Composition API への移行
2. `<script setup>` の導入
3. プロパティとイベントの更新

#### Phase 4: 状態管理移行
1. Vuex から Pinia への移行
2. ストア構造の再設計

#### Phase 5: プラグイン・ミドルウェア移行
1. プラグイン API の更新
2. ミドルウェア構文の変更

### 3. 注意すべき破壊的変更

#### Vue 3 関連
- **フィルター廃止**: `{{ value | filter }}` → computed プロパティまたはメソッド
- **$listeners 廃止**: `v-bind="$attrs"` で代替
- **Global API 変更**: `Vue.component()` → `app.component()`
- **v-model 変更**: カスタムコンポーネントでの v-model の動作変更

#### Nuxt 3 関連
- **Context 廃止**: `context` → `useNuxtApp()`, `useRoute()` など
- **asyncData/fetch 変更**: `<script setup>` での新しい書き方
- **$nuxt 廃止**: 新しい Composables の使用
- **process.client/server**: `import.meta.client/server` に変更

#### ルーティング
- **router.extendRoutes**: `pages:extend` フックに変更
- **動的ルート**: `_slug.vue` → `[slug].vue`

#### プラグイン
- **プラグイン注入**: `inject()` → `provide()` / `useNuxtApp()`
- **プラグイン初期化**: 新しい `defineNuxtPlugin()` 構文

### 4. 移行チェックリスト

#### 設定ファイル
- [ ] `nuxt.config.js` → `defineNuxtConfig()` への変更
- [ ] `buildModules` → `modules` への移行
- [ ] `static/` → `public/` ディレクトリ名変更
- [ ] TypeScript設定の追加

#### コンポーネント
- [ ] `<script setup>` への移行
- [ ] Composition API の導入
- [ ] フィルターの削除・代替実装
- [ ] `$listeners` の削除
- [ ] v-model の動作確認

#### 状態管理
- [ ] Vuex → Pinia への移行
- [ ] ストア構造の再設計
- [ ] アクション・ミューテーションの更新

#### API・Composables
- [ ] `asyncData` → `useFetch()` / `$fetch()` への移行
- [ ] `fetch` → `useLazyFetch()` への移行
- [ ] `context` → 各種 Composables への移行
- [ ] `$nuxt` の削除・代替実装

#### プラグイン・ミドルウェア
- [ ] プラグイン構文の更新
- [ ] ミドルウェア構文の更新
- [ ] 依存関係の更新

### 5. テスト項目

#### 機能テスト
- [ ] ページルーティング
- [ ] 動的ルーティング
- [ ] レイアウト切り替え
- [ ] コンポーネント間通信
- [ ] 状態管理
- [ ] API通信
- [ ] SSR/SPA モード

#### パフォーマンステスト
- [ ] ビルド時間
- [ ] バンドルサイズ
- [ ] 初期表示速度
- [ ] ナビゲーション速度

## 📚 参考資料

### 公式ドキュメント
- [Nuxt 3 Migration Guide](https://nuxt.com/docs/migration/overview)
- [Vue 3 Migration Guide](https://v3-migration.vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)

### 主要な変更点
- [Nuxt 3 Configuration](https://nuxt.com/docs/migration/configuration)
- [Vue 3 Breaking Changes](https://v3-migration.vuejs.org/breaking-changes/)
- [Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)

## 🛠️ Docker開発コマンド

### 基本操作
```bash
# コンテナの起動
docker-compose up -d

# コンテナの停止
docker-compose down

# コンテナの再起動
docker-compose restart

# ログの確認
docker-compose logs -f nuxt
```

### 開発コマンド（Docker内）
```bash
# 開発サーバー起動
docker-compose exec nuxt npm run dev

# プロダクションビルド
docker-compose exec nuxt npm run build

# プロダクション起動
docker-compose exec nuxt npm run start

# 静的サイト生成
docker-compose exec nuxt npm run generate

# 型チェック（TypeScript移行後）
docker-compose exec nuxt npm run typecheck

# リント
docker-compose exec nuxt npm run lint

# 依存関係のインストール
docker-compose exec nuxt npm install

# パッケージの追加
docker-compose exec nuxt npm install <package-name>
```

### Docker環境のメンテナンス
```bash
# イメージの再ビルド
docker-compose build --no-cache

# ボリュームの削除
docker-compose down -v

# 未使用のイメージ・コンテナの削除
docker system prune -a

# コンテナ内でのシェル実行
docker-compose exec nuxt sh
```

## 🐳 Docker設定

### Dockerfile（Nuxt v2用）
```dockerfile
FROM node:18-alpine

WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係のインストール
RUN npm ci --only=production

# アプリケーションのソースをコピー
COPY . .

# ポート3000を公開
EXPOSE 3000

# 開発サーバーの起動
CMD ["npm", "run", "dev"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  nuxt:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev
```

## 📝 マイグレーション進捗

- [ ] Phase 1: 環境準備（Docker環境構築含む）
- [ ] Phase 2: 設定ファイル移行
- [ ] Phase 3: コンポーネント移行
- [ ] Phase 4: 状態管理移行
- [ ] Phase 5: プラグイン・ミドルウェア移行

## 🚨 既知の問題・注意点

1. **Vue 3 の破壊的変更**: フィルター、$listeners などの廃止機能
2. **Nuxt 3 の新しい API**: Context の廃止、新しい Composables の学習が必要
3. **TypeScript 推奨**: Nuxt 3 では TypeScript の使用が強く推奨される
4. **ビルドツール変更**: Webpack → Vite への移行でビルド設定の見直しが必要
5. **プラグインエコシステム**: 一部のプラグインが Nuxt 3 未対応の可能性
6. **Docker環境**: ホットリロードが正常に動作しない場合は、ボリュームマウントの設定を確認

## 🔧 トラブルシューティング

### Docker関連
- **ポート競合**: 他のアプリケーションが3000番ポートを使用している場合は、docker-compose.ymlのポート設定を変更
- **ボリュームマウント**: Windowsでのパス問題やパーミッション問題が発生する場合
- **ホットリロード**: ファイル変更が反映されない場合は、polling設定を追加

### パフォーマンス
- **初回ビルド**: Docker環境では初回のnpm installに時間がかかる場合があります
- **ファイル監視**: 大量のファイルがある場合、ファイル監視の制限に注意

## 📞 サポート

マイグレーション中に問題が発生した場合は、以下のリソースを参照してください：

- [Nuxt 3 公式ドキュメント](https://nuxt.com/docs)
- [Nuxt Community Discord](https://discord.com/invite/ps2h6QT)
- [GitHub Issues](https://github.com/nuxt/nuxt/issues)
- [Docker公式ドキュメント](https://docs.docker.com/)

---

**注意**: このプロジェクトはマイグレーション試験用のため、本番環境での使用は推奨されません。 