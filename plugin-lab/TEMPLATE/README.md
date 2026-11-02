# Lab Example template

A Host bundle in three files: `package.json`, `cordis.patch.yml`, `index.js`. Copy
this directory to a new plugin name, then:

1. Rename `package.json` `name` to your package name and bump `version`.
2. Rename the row `id` and `name` in `cordis.patch.yml`.
3. Rename the `name` export and tool name in `index.js`; replace the `lab_ping` body
   with the smallest implementation that closes the acceptance gap.
4. Update `locale/en.json` and the icon (meaningful title, description, original
   artwork; no default template text in a shipped plugin).
5. Write `ACCEPTANCE/<name>.md`, record its hash, then install.

Do not install this template as-is; it exists to be copied.
