#!/usr/bin/env bash
#
# Build every crate under crates/ to an ES-module `pkg/` that Astro can import.
#
#   ./build.sh              # build all crates
#   ./build.sh binary-search  # build just one crate
#
# Each crate's output lands in crates/<name>/pkg/ (gitignored). Astro imports
# the generated JS glue, which fetches the sibling .wasm at runtime.
set -euo pipefail
cd "$(dirname "$0")"

build_one() {
  local dir="$1"
  local name
  name="$(basename "$dir")"
  echo ">>> building $name"
  wasm-pack build "$dir" --target web --out-dir pkg --release
}

if [[ $# -gt 0 ]]; then
  build_one "crates/$1"
else
  for dir in crates/*/; do
    build_one "${dir%/}"
  done
fi
