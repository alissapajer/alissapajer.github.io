#!/usr/bin/env bash
#
# Build every crate under crates/ to an ES module that Astro imports via the
# `@wasm/<crate>` alias (configured in astro.config.mjs + tsconfig.json).
#
#   ./build.sh              # build all crates
#   ./build.sh binary-search  # build just one crate
#
# Output lands in <repo>/src/wasm/<crate>/ (gitignored). The generated JS glue
# fetches its sibling .wasm at runtime; Vite bundles and fingerprints both.
set -euo pipefail
cd "$(dirname "$0")"
ROOT="$(cd .. && pwd)"

build_one() {
  local dir="$1"
  local name
  name="$(basename "$dir")"
  echo ">>> building $name -> src/wasm/$name"
  wasm-pack build "$dir" --target web --out-dir "$ROOT/src/wasm/$name" --release
}

if [[ $# -gt 0 ]]; then
  build_one "crates/$1"
else
  for dir in crates/*/; do
    build_one "${dir%/}"
  done
fi
