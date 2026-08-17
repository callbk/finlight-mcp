# finlight MCP Server

*[English](README.md) | 简体中文 | [日本語](README.ja.md) | [한국어](README.ko.md)*

`mcp-name: me.finlight/news`

[![smithery badge](https://smithery.ai/badge/callbk/finlight)](https://smithery.ai/servers/callbk/finlight) [![finlight-mcp MCP server](https://glama.ai/mcp/servers/callbk/finlight-mcp/badges/score.svg)](https://glama.ai/mcp/servers/callbk/finlight-mcp) [![npm](https://img.shields.io/npm/v/finlight-mcp)](https://www.npmjs.com/package/finlight-mcp)

面向 AI 代理的实时财经新闻。将 Claude、ChatGPT、Cursor 或任何 MCP 客户端连接到 [finlight](https://finlight.me/zh)。finlight 是一个财经新闻 API，覆盖全球市场、地缘政治和公司层面的新闻，并提供情感分析和公司实体标注。

**端点：** `https://mcp.finlight.me`（远程，streamable HTTP）
**认证：** OAuth 2.0（连接时会提示你输入 finlight API 密钥）
**注册表：** `me.finlight/news`

## 你可以做什么

向你的 AI 助手提问，例如：

- “NVDA 最近有什么新闻？总结一下情感分析结果。”
- “过去 2 小时内，主要通讯社有哪些可能影响市场的头条？”
- “比较不同新闻源对美联储决议的报道。”
- “查找关于半导体出口限制的近期文章，并列出其中提到的公司。”
- “finlight 覆盖哪些中国市场新闻的来源？”

## 工具

| 工具                  | 说明                                                                                                                   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `search_articles`     | 搜索财经新闻文章，支持按查询语句、股票代码、新闻源、国家、语言和日期区间过滤。返回带元数据、情感评分和公司实体标注的文章。 |
| `get_article_by_link` | 按 URL 获取指定文章，包含完整增强数据（情感、置信度、带股票代码和 ISIN 的公司标注）。                                     |
| `list_sources`        | 列出所有可用新闻源及其所在国家和全文可用性。                                                                             |

## 设置

你需要一个 finlight API 密钥，提供免费套餐：[在 app.finlight.me 注册](https://app.finlight.me)。

### Claude（网页版 / 桌面版）

1. 打开 **Settings → Connectors → Add custom connector**
2. 输入 `https://mcp.finlight.me`
3. 完成 OAuth 流程：系统会提示你粘贴一次 finlight API 密钥

### Claude Code

```bash
claude mcp add --transport http finlight https://mcp.finlight.me
```

### Cursor

添加到你的 MCP 设置（`.cursor/mcp.json`）：

```json
{
  "mcpServers": {
    "finlight": {
      "url": "https://mcp.finlight.me"
    }
  }
}
```

### ChatGPT（开发者模式 / 连接器）

将 `https://mcp.finlight.me` 添加为远程 MCP 服务器，并使用你的 API 密钥完成 OAuth 流程。

### Stdio / 本地使用

对于仅支持 stdio 传输的 MCP 客户端（或你希望在本地启动进程的情况），使用 npm 包装器：

```bash
npx finlight-mcp
```

它通过 `mcp-remote` 将 stdio 桥接到远程服务器。可以添加到任何接受 command + args 的客户端配置：

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

OAuth 流程相同：首次使用时会打开浏览器窗口，让你输入 API 密钥。

对于没有浏览器可用的 headless 或 CI 环境，设置 `FINLIGHT_API_KEY` 以跳过 OAuth 并直接认证：

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

## 认证方式

服务器支持两种认证方式：

1. **OAuth 2.0**（默认）：带 PKCE 的动态客户端注册。浏览器窗口会打开，让你输入 finlight API 密钥。任何支持 OAuth 的 MCP 客户端均可直接使用。
2. **通过请求头传 API 密钥**：设置 `FINLIGHT_API_KEY` 环境变量以跳过浏览器流程。密钥会作为 Bearer token 直接发送。

## 关于数据

finlight 聚合并增强来自精选财经相关来源的新闻，包括主要通讯社、财经媒体和区域性来源（含中文财经媒体，附带英文规范化实体标注）。文章包含：

- 情感评分及置信度
- 标注的公司实体，含股票代码、ISIN 和交易所上市信息
- 新闻源、语言、国家和发布元数据

MCP 服务器与 [REST 和 WebSocket API](https://docs.finlight.me/zh/v2) 使用相同的数据。

## 速率限制与套餐

MCP 请求计入你的 API 配额。各付费套餐的实时访问、更高限额和其他功能见 [pricing](https://finlight.me/zh/pricing)。

## 链接

- 网站：[finlight.me](https://finlight.me/zh)
- MCP 产品页：[finlight.me/mcp](https://finlight.me/zh/mcp)
- API 文档：[docs.finlight.me](https://docs.finlight.me/zh/v2)
- Discord：[discord.gg/XUs9JYZd24](https://discord.com/invite/XUs9JYZd24)
- 支持：通过 [app.finlight.me](https://app.finlight.me) 或 Discord 获取支持

## 反馈

欢迎在 GitHub 上提交 MCP 服务器的 Issue 和功能请求。关于 API 的问题，请使用 Discord 或上述支持渠道。

---

🌏 中文产品页：[finlight.me/zh/mcp](https://finlight.me/zh/mcp)
