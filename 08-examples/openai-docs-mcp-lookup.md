# OpenAI Docs MCP Lookup

## Scenario

You need the current OpenAI or Codex answer for a repo task, and the repository does not contain that truth.

## Flow

1. state the exact OpenAI or Codex question
2. use Docs MCP instead of memory
3. summarize the doc page and what it proves
4. map that answer to the local files or workflow it affects
5. make the smallest justified change or recommendation
6. verify the local result with repo checks

## Setup

~~~bash
codex mcp add openaiDeveloperDocs --url https://developers.openai.com/mcp
codex mcp list
~~~

## AGENTS.md snippet

~~~md
Always use the OpenAI developer documentation MCP server if you need to work with the OpenAI API, ChatGPT Apps SDK, Codex, or OpenAI platform docs without me having to explicitly ask.
~~~

## Prompt shape

~~~text
Use the OpenAI developer documentation MCP server for this answer.

Question:
- what is the current command or config shape I should follow?

First summarize:
- which docs page you checked
- the exact point it proves
- which local files or workflows it affects

Then inspect the repo and propose the smallest safe change.
Verify with the relevant local checks.
~~~

## Example use

This is a good fit for:

- updating a Codex CLI command in docs
- checking the current Docs MCP setup path
- confirming a current Codex config field before changing starter assets
- verifying a current GitHub or automation flag in an OpenAI-specific workflow
