# Silverbullet Wypst
Typst and LaTeX math for [Silverbullet](https://silverbullet.md). A fork of [Silverbullet Math](https://github.com/MrMugame/silverbullet-math) that adds Typst through [wypst](https://github.com/0xpapercut/wypst).

## Limitations
- This library was written with the help of Claude, an AI assistant. The maintainer has no prior JavaScript experience, so it may contain bugs or security issues. It is provided as is, without warranty. Use it at your own risk.
- wypst supports Typst 0.10 math only and is no longer maintained.
- LaTeX without a command, like `$x^{10}$`, is treated as Typst.
- `wypst.wasm` is 12.7 MB. Each device syncs it once and loads it on the first Typst formula.

## Usage
1. If Silverbullet Math is installed, remove it in the Library Manager. Both libraries define the `$` syntax.
2. Run the `Library: Install` command and enter this link:
   ```
   https://github.com/junlangw/silverbullet-Wypst/blob/main/Wypst.md
   ```
3. Write `$ ... $` for inline math and `$$ ... $$` for block math, with each `$$` on its own line.

A formula with a LaTeX command (a backslash followed by a non-space character, like `\pi`) is rendered with KaTeX. Everything else is rendered as Typst. This rule follows the Logseq plugin [logseq-wypst](https://github.com/luh-05/logseq-wypst).

## License
MIT. Bundled code keeps its own license: wypst (MIT), KaTeX (MIT), Typst (Apache-2.0). The license files are in `Silverbullet-Wypst/`.
