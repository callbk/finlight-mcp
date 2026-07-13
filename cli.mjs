#!/usr/bin/env node

import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { resolve, dirname } from "node:path";

const require = createRequire(import.meta.url);
const mcpRemotePkg = dirname(require.resolve("mcp-remote/package.json"));
const mcpRemoteBin = resolve(mcpRemotePkg, "dist", "proxy.js");

const child = spawn(
  process.execPath,
  [mcpRemoteBin, "https://mcp.finlight.me", ...process.argv.slice(2)],
  { stdio: "inherit" }
);

const forward = (signal) => {
  child.kill(signal);
};
process.on("SIGINT", forward);
process.on("SIGTERM", forward);

child.on("exit", (code, signal) => {
  process.off("SIGINT", forward);
  process.off("SIGTERM", forward);
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 1);
  }
});
