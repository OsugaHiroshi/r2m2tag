# 概要
r2mというタイトルのPRがマージされた時に自動的にtagを作るbot

# how to work

# environment variables
- ENTRY_POINT
  - githubのhookを受け取るエントリーポイント
- TARGET_REPOS
  - CSV形式でリポジトリを指定
  - ex `user/repo,org/repo`
- GITHUB_PERSONAL_TOKEN
  - github の パーソナルトークン
  - 必須スコープ
    - repos
