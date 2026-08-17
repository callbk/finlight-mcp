# finlight MCP Server

*[English](README.md) | [简体中文](README.zh-CN.md) | 日本語 | [한국어](README.ko.md)*

`mcp-name: me.finlight/news`

[![smithery badge](https://smithery.ai/badge/callbk/finlight)](https://smithery.ai/servers/callbk/finlight) [![finlight-mcp MCP server](https://glama.ai/mcp/servers/callbk/finlight-mcp/badges/score.svg)](https://glama.ai/mcp/servers/callbk/finlight-mcp) [![npm](https://img.shields.io/npm/v/finlight-mcp)](https://www.npmjs.com/package/finlight-mcp)

AI エージェント向けのリアルタイム財経ニュース。Claude、ChatGPT、Cursor をはじめ、あらゆる MCP クライアントを [finlight](https://finlight.me/ja) に接続できます。finlight は、グローバル市場、地政学、企業レベルのニュースをカバーする金融ニュース API で、センチメント分析と企業エンティティのタグ付けを提供します。

**エンドポイント:** `https://mcp.finlight.me`（リモート、streamable HTTP）
**認証:** OAuth 2.0（接続時に finlight API キーの入力を求められます）
**レジストリ:** `me.finlight/news`

## できること

AI アシスタントに次のように尋ねられます:

- 「NVDA の最新ニュースは？センチメントを要約して。」
- 「過去 2 時間で、主要通信社発の相場を動かしそうなヘッドラインはある？」
- 「FRB の決定に関する報道をソース横断で比較して。」
- 「半導体輸出規制に関する最近の記事を探して、言及されている企業を一覧にして。」
- 「finlight は中国市場ニュースについてどのソースをカバーしている？」

## ツール

| ツール                | 説明                                                                                                                                                       |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `search_articles`     | クエリ、ティッカー、ニュースソース、国、言語、日付範囲で絞り込んで財経ニュース記事を検索します。メタデータ、センチメントスコア、企業エンティティのタグ付きで記事を返します。 |
| `get_article_by_link` | URL を指定して特定の記事を取得します。エンリッチメント一式（センチメント、確信度、ティッカーと ISIN 付きの企業タグ）を含みます。                                 |
| `list_sources`        | 利用可能なすべてのニュースソースを、発信国と全文提供の有無とあわせて一覧表示します。                                                                             |

## セットアップ

finlight API キーが必要です。無料プランがあります: [app.finlight.me でサインアップ](https://app.finlight.me)。

### Claude（Web / デスクトップ）

1. **Settings → Connectors → Add custom connector** を開く
2. `https://mcp.finlight.me` を入力する
3. OAuth フローを完了する: finlight API キーの貼り付けを一度求められます

### Claude Code

```bash
claude mcp add --transport http finlight https://mcp.finlight.me
```

### Cursor

MCP 設定（`.cursor/mcp.json`）に追加します:

```json
{
  "mcpServers": {
    "finlight": {
      "url": "https://mcp.finlight.me"
    }
  }
}
```

### ChatGPT（開発者モード / コネクタ）

`https://mcp.finlight.me` をリモート MCP サーバーとして追加し、API キーで OAuth フローを完了します。

### Stdio / ローカル利用

stdio トランスポートのみに対応する MCP クライアントの場合（またはローカルでプロセスを起動したい場合）は、npm ラッパーを使います:

```bash
npx finlight-mcp
```

これは `mcp-remote` を介して stdio をリモートサーバーにブリッジします。command + args を受け付ける任意のクライアント設定に追加できます:

```json
{
  "mcpServers": {
    "finlight": {
      "command": "npx",
      "args": ["-y", "finlight-mcp"]
    }
  }
}
```

OAuth フローは同じです。初回利用時にブラウザウィンドウが開き、API キーを入力します。

ブラウザが使えない headless 環境や CI 環境では、`FINLIGHT_API_KEY` を設定すると OAuth をスキップして直接認証できます:

```json
{
  "mcpServers": {
    "finlight": {
      "command": "npx",
      "args": ["-y", "finlight-mcp"],
      "env": {
        "FINLIGHT_API_KEY": "your-api-key"
      }
    }
  }
}
```

## 認証の仕組み

サーバーは 2 つの認証方式に対応しています:

1. **OAuth 2.0**（デフォルト）: PKCE 付きの動的クライアント登録。ブラウザウィンドウが開き、finlight API キーを入力します。OAuth に対応する MCP クライアントであればそのまま動作します。
2. **ヘッダー経由の API キー**: 環境変数 `FINLIGHT_API_KEY` を設定するとブラウザフローをスキップできます。キーは Bearer トークンとして直接送信されます。

## データについて

finlight は、厳選された金融関連ソースからニュースを集約・エンリッチしています。主要通信社、金融系媒体、地域ソース（中国語の財経メディアを含み、英語の正規化エンティティタグ付き）が含まれます。記事には次が含まれます:

- センチメントスコアと確信度
- タグ付けされた企業エンティティ（ティッカー、ISIN、上場取引所付き）
- ソース、言語、国、公開日時のメタデータ

MCP サーバーは [REST および WebSocket API](https://docs.finlight.me/ja/v2) と同じデータを使用します。

## レート制限とプラン

MCP のリクエストは API クォータにカウントされます。リアルタイムアクセス、より高い上限、追加機能を含む有料プランは [pricing](https://finlight.me/ja/pricing) を参照してください。

## リンク

- Web サイト: [finlight.me](https://finlight.me/ja)
- MCP 製品ページ: [finlight.me/mcp](https://finlight.me/ja/mcp)
- API ドキュメント: [docs.finlight.me](https://docs.finlight.me/ja/v2)
- Discord: [discord.gg/XUs9JYZd24](https://discord.com/invite/XUs9JYZd24)
- サポート: [app.finlight.me](https://app.finlight.me) または Discord から

## フィードバック

MCP サーバーに関する Issue や機能要望は、この GitHub リポジトリで歓迎します。API に関する質問は Discord または上記のサポートチャネルをご利用ください。

---

🗾 日本語の製品ページ: [finlight.me/ja/mcp](https://finlight.me/ja/mcp)
