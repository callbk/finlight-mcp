# finlight MCP Server

Real-time financial news for AI agents. Connect Claude, ChatGPT, Cursor, or any MCP client to [finlight](https://finlight.me), a financial news API covering global markets, geopolitics, and company-level news with sentiment analysis and entity tagging.

**Endpoint:** `https://mcp.finlight.me` (remote, streamable HTTP)
**Auth:** OAuth 2.0 (you'll be prompted for your finlight API key during connection)
**Registry:** `me.finlight/news`

## What you can do

Ask your AI assistant things like:

- "What's the latest news on NVDA? Summarize sentiment."
- "Any market-moving headlines from Reuters in the last 2 hours?"
- "Compare news coverage of the Fed decision across sources."
- "Find recent articles about semiconductor export restrictions and list the companies mentioned."
- "Which sources does finlight cover for Chinese market news?"

## Tools

| Tool                  | Description                                                                                                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `search_articles`     | Search financial news articles with filters for query, tickers, sources, countries, language, and date range. Returns articles with metadata, sentiment scores, and tagged company entities. |
| `get_article_by_link` | Retrieve a specific article by its URL, including full enrichment (sentiment, confidence, tagged companies with tickers and ISINs).                                                          |
| `list_sources`        | List all available news sources with country of origin and content availability.                                                                                                             |

## Setup

You need a finlight API key. The free tier includes 5,000 requests per month: [sign up at app.finlight.me](https://app.finlight.me).

### Claude (web / desktop)

1. Go to **Settings → Connectors → Add custom connector**
2. Enter `https://mcp.finlight.me`
3. Complete the OAuth flow: you'll be asked to paste your finlight API key once

### Claude Code

```bash
claude mcp add --transport http finlight https://mcp.finlight.me
```

### Cursor

Add to your MCP settings (`.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "finlight": {
      "url": "https://mcp.finlight.me"
    }
  }
}
```

### ChatGPT (developer mode / connectors)

Add `https://mcp.finlight.me` as a remote MCP server and complete the OAuth flow with your API key.

## How auth works

The server implements standard OAuth 2.0 with dynamic client registration and PKCE. During authorization you enter your finlight API key on a hosted page; the server never stores it. This means any MCP client that speaks OAuth works out of the box, no manual header configuration needed.

## About the data

finlight aggregates and enriches financial news from curated, finance-relevant sources including major wire services, financial publishers, and regional sources (including Chinese-language financial media such as CLS, Caixin, Yicai, and East Money, with English canonical entity tagging). Articles include:

- Sentiment score with confidence
- Tagged company entities with tickers, ISINs, and exchange listings
- Source, language, country, and publish metadata

The MCP server uses the same data as the [REST and WebSocket APIs](https://docs.finlight.me).

## Rate limits and plans

MCP requests count toward your API quota. Free tier: 5,000 requests/month. See [pricing](https://finlight.me/pricing) for paid tiers with real-time access, higher limits, and additional features.

## Links

- Website: [finlight.me](https://finlight.me)
- MCP landing page: [finlight.me/mcp](https://finlight.me/mcp)
- API docs: [docs.finlight.me](https://docs.finlight.me)
- Discord: [discord.gg/XUs9JYZd24](https://discord.com/invite/XUs9JYZd24)
- Support: support via [app.finlight.me](https://app.finlight.me) or Discord

## Feedback

Issues and feature requests for the MCP server are welcome here on GitHub. For API questions, use Discord or the support channels above.
