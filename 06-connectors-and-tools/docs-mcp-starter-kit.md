# Docs MCP Starter Kit

Use Docs MCP when the task depends on current OpenAI or Codex documentation and the answer should come from a live official source, not memory.

## What it is for

- current OpenAI API behavior
- Codex CLI, IDE, app, or GitHub workflow details
- ChatGPT Apps SDK or MCP questions
- OpenAI docs lookup that should stay traceable to the source

This server is documentation-only. It reads OpenAI developer docs. It does not call the OpenAI API on your behalf.

## CLI setup

Add the server:

~~~bash
codex mcp add openaiDeveloperDocs --url https://developers.openai.com/mcp
~~~

Verify it:

~~~bash
codex mcp list
~~~

If you prefer config over commands, add this to `~/.codex/config.toml`:

~~~toml
[mcp_servers.openaiDeveloperDocs]
url = "https://developers.openai.com/mcp"
~~~

See [../.codex/config.example.toml](../.codex/config.example.toml) for a starter config block.

## AGENTS.md snippet

Add this when you want Codex to use Docs MCP automatically for OpenAI-specific questions:

~~~md
Always use the OpenAI developer documentation MCP server if you need to work with the OpenAI API, ChatGPT Apps SDK, Codex, or OpenAI platform docs without me having to explicitly ask.
~~~

Without that snippet, tell Codex explicitly to consult Docs MCP for the answer.

## Editor setup

For VS Code-style MCP config, start from [../.vscode/mcp.json.example](../.vscode/mcp.json.example).

~~~json
{
  "servers": {
    "openaiDeveloperDocs": {
      "type": "http",
      "url": "https://developers.openai.com/mcp"
    }
  }
}
~~~

## Prompt shape

Use a prompt that keeps the lookup narrow and forces the answer back into the local task.

~~~text
Use the OpenAI developer documentation MCP server for the current answer.

First return:
- the doc page or pages you checked
- the exact point those pages confirm
- what in this repository that answer affects

Then inspect the repo and propose or implement the smallest change.
Do not rely on memory when the docs answer it directly.
~~~

## Verification path

1. verify the MCP server is configured
2. ask the exact narrow docs question
3. summarize the answer before editing
4. run the local repo checks that prove the change is correct

## Avoid

- using Docs MCP for facts already proven by the checkout
- asking broad product-comparison questions when you really need one command or one config field
- treating Docs MCP output as enough without local verification
- forgetting to tell Codex to use Docs MCP when your `AGENTS.md` does not already say so
