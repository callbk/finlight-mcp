# finlight MCP Server

*[English](README.md) | [简体中文](README.zh-CN.md) | [日本語](README.ja.md) | 한국어*

`mcp-name: me.finlight/news`

[![smithery badge](https://smithery.ai/badge/callbk/finlight)](https://smithery.ai/servers/callbk/finlight) [![finlight-mcp MCP server](https://glama.ai/mcp/servers/callbk/finlight-mcp/badges/score.svg)](https://glama.ai/mcp/servers/callbk/finlight-mcp) [![npm](https://img.shields.io/npm/v/finlight-mcp)](https://www.npmjs.com/package/finlight-mcp)

AI 에이전트를 위한 실시간 금융 뉴스. Claude, ChatGPT, Cursor를 비롯한 모든 MCP 클라이언트를 [finlight](https://finlight.me)에 연결할 수 있습니다. finlight는 글로벌 시장, 지정학, 기업 단위 뉴스를 다루는 금융 뉴스 API로, 감성 분석과 기업 엔티티 태깅을 제공합니다.

**엔드포인트:** `https://mcp.finlight.me` (원격, streamable HTTP)
**인증:** OAuth 2.0 (연결 시 finlight API 키 입력을 요청합니다)
**레지스트리:** `me.finlight/news`

## 무엇을 할 수 있나요

AI 어시스턴트에게 이렇게 물어볼 수 있습니다:

- "NVDA 관련 최신 뉴스는? 감성 분석 결과를 요약해 줘."
- "지난 2시간 동안 주요 통신사에서 시장을 움직일 만한 헤드라인이 있었어?"
- "연준 결정에 대한 보도를 뉴스 소스별로 비교해 줘."
- "반도체 수출 규제에 관한 최근 기사를 찾아서 언급된 기업을 나열해 줘."
- "finlight는 중국 시장 뉴스에 대해 어떤 소스를 다루고 있어?"

## 도구

| 도구                  | 설명                                                                                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `search_articles`     | 쿼리, 티커, 뉴스 소스, 국가, 언어, 날짜 범위 필터로 금융 뉴스 기사를 검색합니다. 메타데이터, 감성 점수, 기업 엔티티 태그와 함께 기사를 반환합니다. |
| `get_article_by_link` | URL로 특정 기사를 조회합니다. 전체 보강 데이터(감성, 신뢰도, 티커와 ISIN이 포함된 기업 태그)를 포함합니다.                                     |
| `list_sources`        | 사용 가능한 모든 뉴스 소스를 발행 국가 및 본문 제공 여부와 함께 나열합니다.                                                                   |

## 설정

finlight API 키가 필요합니다. 무료 플랜이 있습니다: [app.finlight.me에서 가입](https://app.finlight.me).

### Claude (웹 / 데스크톱)

1. **Settings → Connectors → Add custom connector**로 이동
2. `https://mcp.finlight.me` 입력
3. OAuth 절차 완료: finlight API 키를 한 번 붙여넣도록 요청받습니다

### Claude Code

```bash
claude mcp add --transport http finlight https://mcp.finlight.me
```

### Cursor

MCP 설정(`.cursor/mcp.json`)에 추가합니다:

```json
{
  "mcpServers": {
    "finlight": {
      "url": "https://mcp.finlight.me"
    }
  }
}
```

### ChatGPT (개발자 모드 / 커넥터)

`https://mcp.finlight.me`를 원격 MCP 서버로 추가하고 API 키로 OAuth 절차를 완료합니다.

### Stdio / 로컬 사용

stdio 전송만 지원하는 MCP 클라이언트의 경우(또는 로컬에서 프로세스를 직접 실행하고 싶은 경우) npm 래퍼를 사용합니다:

```bash
npx finlight-mcp
```

이 래퍼는 `mcp-remote`를 통해 stdio를 원격 서버로 연결합니다. command + args를 받는 모든 클라이언트 설정에 추가할 수 있습니다:

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

OAuth 절차는 동일합니다. 처음 사용할 때 브라우저 창이 열리고 API 키를 입력하게 됩니다.

브라우저를 사용할 수 없는 headless 환경이나 CI 환경에서는 `FINLIGHT_API_KEY`를 설정하여 OAuth를 건너뛰고 직접 인증할 수 있습니다:

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

## 인증 방식

서버는 두 가지 인증 방식을 지원합니다:

1. **OAuth 2.0** (기본값): PKCE를 사용한 동적 클라이언트 등록. 브라우저 창이 열리고 finlight API 키를 입력합니다. OAuth를 지원하는 모든 MCP 클라이언트에서 그대로 동작합니다.
2. **헤더를 통한 API 키**: 환경 변수 `FINLIGHT_API_KEY`를 설정하면 브라우저 절차를 건너뜁니다. 키는 Bearer 토큰으로 직접 전송됩니다.

## 데이터에 대하여

finlight는 엄선된 금융 관련 소스의 뉴스를 수집하고 보강합니다. 주요 통신사, 금융 전문 매체, 지역 소스(중국어 금융 미디어 포함, 영어 정규화 엔티티 태깅 제공)가 포함됩니다. 기사에는 다음이 포함됩니다:

- 감성 점수와 신뢰도
- 태깅된 기업 엔티티(티커, ISIN, 상장 거래소 포함)
- 소스, 언어, 국가, 발행 메타데이터

MCP 서버는 [REST 및 WebSocket API](https://docs.finlight.me)와 동일한 데이터를 사용합니다.

## 요청 한도와 플랜

MCP 요청은 API 쿼터에 포함됩니다. 실시간 액세스, 더 높은 한도, 추가 기능이 포함된 유료 플랜은 [pricing](https://finlight.me/pricing)을 참고하세요.

## 링크

- 웹사이트: [finlight.me](https://finlight.me)
- MCP 제품 페이지: [finlight.me/mcp](https://finlight.me/mcp)
- API 문서: [docs.finlight.me](https://docs.finlight.me)
- Discord: [discord.gg/XUs9JYZd24](https://discord.com/invite/XUs9JYZd24)
- 지원: [app.finlight.me](https://app.finlight.me) 또는 Discord를 통해 문의

## 피드백

MCP 서버에 대한 이슈와 기능 요청은 이 GitHub 저장소에서 환영합니다. API 관련 질문은 Discord 또는 위의 지원 채널을 이용해 주세요.

---

🇰🇷 한국어 제품 페이지: [finlight.me/ko/mcp](https://finlight.me/ko/mcp)
