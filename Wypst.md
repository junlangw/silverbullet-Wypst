---
name: Library/junlangw/Silverbullet-Wypst
tags: meta/library
files:
  - Silverbullet-Wypst/katex.mjs
  - Silverbullet-Wypst/katex.min.css
  - Silverbullet-Wypst/typst.mjs
  - Silverbullet-Wypst/wypst.js
  - Silverbullet-Wypst/wypst.wasm
  - Silverbullet-Wypst/fonts/KaTeX_Typewriter-Regular.woff2
  - Silverbullet-Wypst/fonts/KaTeX_Size4-Regular.woff2
  - Silverbullet-Wypst/fonts/KaTeX_Size3-Regular.woff2
  - Silverbullet-Wypst/fonts/KaTeX_Size2-Regular.woff2
  - Silverbullet-Wypst/fonts/KaTeX_Size1-Regular.woff2
  - Silverbullet-Wypst/fonts/KaTeX_Script-Regular.woff2
  - Silverbullet-Wypst/fonts/KaTeX_SansSerif-Regular.woff2
  - Silverbullet-Wypst/fonts/KaTeX_SansSerif-Italic.woff2
  - Silverbullet-Wypst/fonts/KaTeX_SansSerif-Bold.woff2
  - Silverbullet-Wypst/fonts/KaTeX_Math-Italic.woff2
  - Silverbullet-Wypst/fonts/KaTeX_Math-BoldItalic.woff2
  - Silverbullet-Wypst/fonts/KaTeX_Main-Regular.woff2
  - Silverbullet-Wypst/fonts/KaTeX_Main-Italic.woff2
  - Silverbullet-Wypst/fonts/KaTeX_Main-Bold.woff2
  - Silverbullet-Wypst/fonts/KaTeX_Main-BoldItalic.woff2
  - Silverbullet-Wypst/fonts/KaTeX_Fraktur-Regular.woff2
  - Silverbullet-Wypst/fonts/KaTeX_Fraktur-Bold.woff2
  - Silverbullet-Wypst/fonts/KaTeX_Caligraphic-Regular.woff2
  - Silverbullet-Wypst/fonts/KaTeX_Caligraphic-Bold.woff2
  - Silverbullet-Wypst/fonts/KaTeX_AMS-Regular.woff2
---

# Silverbullet Wypst
Renders `$ ... $` (inline) and `$$ ... $$` (block) math. Typst uses [wypst](https://github.com/0xpapercut/wypst), LaTeX uses [KaTeX](https://katex.org/).

A formula with a LaTeX command (a backslash followed by a non-space character, like `\pi`) is LaTeX. Everything else is Typst. This rule follows the Logseq plugin [logseq-wypst](https://github.com/luh-05/logseq-wypst).

To render everything as Typst, turn off "Detect LaTeX" in `Configuration: Open`, or set this in CONFIG:

```lua
config.set("silverbulletWypst.detectLatex", false)
```

## Examples
Typst: $sum_(n >= 1) 1/n^2 = pi^2/6$

LaTeX: $\sum_{n \geq 1} \frac{1}{n^2} = \frac{\pi^2}{6}$

$$
integral_(-infinity)^infinity e^(-x^2) dif x = sqrt(pi)
$$

## Info
The current $\KaTeX$ version is ${latex.katex.version}. wypst is 0.0.8 (Typst 0.10).

## Syntax
```space-lua
syntax.define {
  name = "LatexInline",
  startMarker = "\\$(?!\\{)",
  endMarker = "\\$(?!\\{)",
  mode = "inline",
  startMarkerClass = "sb-latex-mark",
  bodyClass = "sb-latex-body",
  endMarkerClass = "sb-latex-mark",
  render = function(body)
    return latex.inline(body)
  end
}

syntax.define {
  name = "LatexBlock",
  startMarker = "^\\$\\$$",
  endMarker = "^\\$\\$$",
  mode = "block",
  render = function(body)
    return latex.block(body)
  end
}
```

## Implementation
```space-lua
-- priority: 100
config.defineCategory {
  name = "Silverbullet Wypst",
  description = "Typst and LaTeX math rendering.",
}

config.define("silverbulletWypst", {
  description = "Silverbullet Wypst math rendering",
  type = "object",
  properties = {
    detectLatex = {
      type = "boolean",
      default = true,
      description = "Render formulas with a LaTeX command (like \\pi) with KaTeX. Turn off to render everything as Typst.",
      ui = { category = "Silverbullet Wypst", label = "Detect LaTeX" },
    },
  },
})
```

```space-lua
latex = {
  katex = js.import(string.format("%s.fs/Library/junlangw/Silverbullet-Wypst/katex.mjs", system.getURLPrefix())),
  typst = js.import(string.format("%s.fs/Library/junlangw/Silverbullet-Wypst/typst.mjs", system.getURLPrefix()))
}

-- LaTeX if the expression has a command (a backslash followed by a non-space), otherwise Typst.
-- Setting silverbulletWypst.detectLatex to false renders everything as Typst.
local function renderToString(expression, options)
  if config.get("silverbulletWypst.detectLatex", true) and string.find(expression, "\\%S") then
    return latex.katex.renderToString(expression, options)
  end
  return latex.typst.renderToString(expression, options)
end

function latex.inline(expression)
  local html = renderToString(expression, {
    trust = true,
    throwOnError = false,
    displayMode = false
  })

  return widget.new {
    display = "inline",
    html = html
  }
end

function latex.block(expression)
  local html = renderToString(expression, {
    trust = true,
    throwOnError = false,
    displayMode = true
  })

  return widget.new {
    display = "block",
    html = html
  }
end
```

```space-style
@import url(".fs/Library/junlangw/Silverbullet-Wypst/katex.min.css");

.sb-lua-directive-inline:has(.katex-html) {
  border: none !important;
}
```
