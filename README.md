# Mattermost Docker
[![ShellCheck](https://github.com/mattermost/docker/actions/workflows/shellcheck.yml/badge.svg)](https://github.com/mattermost/docker/actions/workflows/shellcheck.yml)
[![Docker Test](https://github.com/mattermost/docker/actions/workflows/docker-test.yml/badge.svg)](https://github.com/mattermost/docker/actions/workflows/docker-test.yml)

Mattermost の公式 Docker デプロイソリューションです。

## インストールと使い方

この Docker イメージのインストール方法と利用方法は、[Mattermost Docker デプロイガイド](https://docs.mattermost.com/deployment-guide/server/deploy-containers.html) を参照してください。

## 管理者ユーザー作成UI（admin-user-ui）

Mattermost のユーザー作成 API（`/api/v4/users`）を呼び出す簡易 Web UI を追加しています。`docker-compose.yml` と `nginx/conf.d/default.conf` を更新することで、`/admin-users/` から利用できます。

### セットアップ手順

1. `.env` に以下の環境変数を設定します。
   - `MM_API_URL`: Mattermost API のベース URL（例: `https://mattermost.example.com`）
   - `MM_ADMIN_TOKEN`: 管理者のパーソナルアクセストークン
2. `docker compose up -d --build` を実行します。
3. ブラウザで `https://<YOUR_DOMAIN>/admin-users/` にアクセスします。

### 権限・セキュリティ上の注意

- UI はブラウザに管理者トークンを配布するため、**必ずアクセスを限定**してください。
- 具体例: IP 制限、Basic 認証、VPN 配下に限定、または社内ネットワークのみで公開するなど。

## コントリビュート

PR は歓迎です。Mattermost への貢献プロセスの概要については、[コントリビュートガイド](https://developers.mattermost.com/contribute/getting-started/) を参照してください。

## `mattermost-docker` からのアップグレード

このリポジトリは、[非推奨となった mattermost-docker リポジトリ](https://github.com/mattermost/mattermost-docker) の置き換えです。アップグレードの詳細なガイドについては、[こちらのドキュメント](https://github.com/mattermost/docker/blob/main/scripts/UPGRADE.md) を参照してください。
