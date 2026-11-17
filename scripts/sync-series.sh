#!/usr/bin/env bash
# Copies one part of the series into content/series/partN/.
#
# Usage, from the repo root, as a normal user:
#   bash scripts/sync-series.sh <folder with the part's files> <part number>
# Example:
#   bash scripts/sync-series.sh ../work/part2 2
#
# Only the files the site uses are copied (method.md and gaps.md stay with
# the research). Files already in the target folder
# are overwritten by the new versions; nothing else is deleted. Commit the
# result with git so the previous version stays in history.
set -euo pipefail

src="${1:?folder with the part files}"
num="${2:?part number}"
dest="content/series/part${num}"

# A part is copied only when the research is complete: its brief, explainer
# and sources, plus the method and gaps notes that show how it was checked.
for f in brief.md explainer.md sources.md method.md gaps.md; do
  if [ ! -f "$src/$f" ]; then
    echo "Not copied: $src/$f is missing, so the part stays In progress." >&2
    exit 1
  fi
done

mkdir -p "$dest"
for f in brief.md explainer.md sources.md scorecard.json; do
  if [ -f "$src/$f" ]; then
    cp "$src/$f" "$dest/$f"
    echo "copied $f"
  fi
done
echo "Done. Run npm run build to check the page."
