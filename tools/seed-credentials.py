"""Seed pi-ai subscription-OAuth grant records into the DSH credential store.

Reads the existing CLI auth files (Codex ChatGPT OAuth, Claude Code OAuth) and
adds two records to $DSH_HOME/.credentials.yaml:
  llm-pi-ai/openai-codex  -> grant payload {type, access, refresh, expires, accountId}
  llm-pi-ai/anthropic     -> grant payload {type, access, refresh, expires}

Never prints credential values. Backs up the YAML before writing and is
idempotent: existing keys are left untouched.
"""

import base64
import json
import os
import re
import shutil
import sys
import time


def load_json(path):
    with open(path, "r", encoding="utf-8") as handle:
        return json.load(handle)


def jwt_exp_ms(token):
    if not isinstance(token, str) or token.count(".") < 2:
        return 0
    try:
        payload = token.split(".")[1]
        payload += "=" * (-len(payload) % 4)
        data = json.loads(base64.urlsafe_b64decode(payload))
        exp = data.get("exp")
        return int(exp) * 1000 if isinstance(exp, (int, float)) else 0
    except Exception:
        return 0


def yaml_quote(value):
    return "'" + str(value).replace("'", "''") + "'"


def record_block(key, fields):
    lines = [f"  {key}:", "    kind: grant", "    payload:"]
    for name, value in fields:
        if name == "expires":
            lines.append(f"      {name}: {value}")
        else:
            lines.append(f"      {name}: {yaml_quote(value)}")
    return lines


def main():
    home = os.environ.get("DSH_HOME") or os.path.join(os.path.expanduser("~"), ".dsh")
    store = os.path.join(home, ".credentials.yaml")
    codex_auth = os.path.join(os.path.expanduser("~"), ".codex", "auth.json")
    claude_auth = os.path.join(os.path.expanduser("~"), ".claude", ".credentials.json")

    if not os.path.exists(store):
        print("store missing:", store)
        return 2

    blocks = []

    if os.path.exists(codex_auth):
        codex = load_json(codex_auth)
        tokens = codex.get("tokens") or {}
        access = tokens.get("access_token")
        refresh = tokens.get("refresh_token")
        account = tokens.get("account_id") or ""
        if access and refresh:
            fields = [("type", "oauth"), ("access", access), ("refresh", refresh)]
            fields.append(("expires", jwt_exp_ms(access)))
            if account:
                fields.append(("accountId", account))
            blocks.append(("llm-pi-ai/openai-codex", fields))
        else:
            print("codex auth present but tokens incomplete")
    else:
        print("codex auth missing:", codex_auth)

    if os.path.exists(claude_auth):
        claude = load_json(claude_auth)
        oauth = claude.get("claudeAiOauth") or {}
        access = oauth.get("accessToken")
        refresh = oauth.get("refreshToken")
        expires = oauth.get("expiresAt")
        if access and refresh:
            exp_ms = int(expires) if isinstance(expires, (int, float)) else jwt_exp_ms(access)
            blocks.append(
                ("llm-pi-ai/anthropic", [("type", "oauth"), ("access", access), ("refresh", refresh), ("expires", exp_ms)])
            )
        else:
            print("claude auth present but tokens incomplete")
    else:
        print("claude auth missing:", claude_auth)

    if not blocks:
        print("nothing to seed")
        return 1

    with open(store, "r", encoding="utf-8") as handle:
        text = handle.read()

    pending = [(key, fields) for key, fields in blocks if key not in text]
    if not pending:
        print("records already present; nothing to do")
        return 0

    lines = text.splitlines()
    insert_at = None
    for index, line in enumerate(lines):
        if re.match(r"^records:\s*(\{\s*\})?\s*$", line):
            insert_at = index + 1
            lines[index] = "records:"
            break
    if insert_at is None:
        lines.append("records:")
        insert_at = len(lines)

    new_lines = []
    for key, fields in pending:
        new_lines.extend(record_block(key, fields))
    lines[insert_at:insert_at] = new_lines

    backup = store + ".bak-" + time.strftime("%Y%m%d-%H%M%S")
    shutil.copy2(store, backup)

    with open(store, "w", encoding="utf-8", newline="\n") as handle:
        handle.write("\n".join(lines) + "\n")

    print("backup:", os.path.basename(backup))
    print("seeded:", ", ".join(key for key, _ in pending))
    for key, fields in pending:
        names = ",".join(name for name, _ in fields)
        access_len = len(str(dict(fields)["access"]))
        print(f"  {key}: fields={names} access_len={access_len}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
