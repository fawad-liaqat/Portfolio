#!/usr/bin/env bash
# Copies the series parts into content/series/partN/.
#
# Run from the repo root, as a normal user (no admin rights needed).
#
#   All parts at once, from a folder that holds part1/, part2/, ...:
#     bash scripts/sync-series.sh /path/to/work
#   One part:
#     bash scripts/sync-series.sh /path/to/work/part2 2
#
# A part is copied only when its research is complete: brief.md,
# explainer.md, sources.md, method.md and gaps.md must all exist. Parts that
# are not complete are skipped and stay "In progress" on the site.
#
# Copied: brief.md, explainer.md, sources.md, method.md and every .json data
# file. gaps.md stays with the research. Files already in the target
# folder are overwritten; nothing else is deleted. Commit the result with git
# so earlier versions stay in history. Rerunning is safe: it gives the same
# result for the same input.
set -euo pipefail

sync_part() {
  local src="$1" num="$2" dest="content/series/part$2"
  for f in brief.md explainer.md sources.md method.md gaps.md; do
    if [ ! -f "$src/$f" ]; then
      echo "Part $num skipped: $src/$f is missing, so it stays In progress." >&2
      return 0
    fi
  done
  mkdir -p "$dest"
  cp "$src/brief.md" "$src/explainer.md" "$src/sources.md" "$src/method.md" "$dest/"
  shopt -s nullglob
  for j in "$src"/*.json; do cp "$j" "$dest/"; done
  shopt -u nullglob
  echo "Part $num copied: $(ls "$dest" | tr '\n' ' ')"
}

if [ $# -eq 2 ]; then
  sync_part "$1" "$2"
elif [ $# -eq 1 ]; then
  for dir in "$1"/part[0-9]*; do
    [ -d "$dir" ] || continue
    sync_part "$dir" "${dir##*part}"
  done
else
  echo "Usage: bash scripts/sync-series.sh <work folder>  or  <part folder> <number>" >&2
  exit 1
fi
echo "Done. Run npm run build to check the pages."
