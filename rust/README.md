# Rust → WASM interactives

Rust crates that compile to WebAssembly and power the interactive widgets on the
blog (algorithm visualizations, etc.). Each interactive is its own crate under
`crates/`; the first is `binary-search`.

## Layout

```
rust/
├── rust-toolchain.toml   # pins Rust 1.97.1 + the wasm32 target (rustup auto-installs)
├── Cargo.toml            # workspace; small-binary release profile
├── build.sh              # builds each crate to an ES-module pkg/ for Astro
└── crates/
    └── binary-search/
        ├── Cargo.toml
        └── src/lib.rs
```

## Prerequisites

- [`rustup`](https://rustup.rs) — the toolchain in `rust-toolchain.toml` is
  installed automatically the first time you run `cargo` in this directory.
- [`wasm-pack`](https://rustwasm.github.io/wasm-pack/) — `brew install wasm-pack`
  or `cargo install wasm-pack`.

## Develop

```bash
cd rust
cargo test          # runs algorithm unit tests natively — no wasm needed
cargo clippy        # lints
cargo fmt           # formats
```

Because each crate is built as both `rlib` and `cdylib`, you can test and debug
the algorithm as ordinary Rust and only reach for wasm when wiring up the UI.

## Build the WASM

```bash
cd rust
./build.sh                 # all crates
./build.sh binary-search   # just one
```

This runs `wasm-pack build --target web`, producing `crates/<name>/pkg/`
(gitignored) containing:

- `<name>_bg.wasm` — the compiled module
- `<name>.js` — ES-module glue with an async `init()` default export and your
  exported functions

## Using it from Astro

`--target web` output is a plain ES module. From a `.astro` component or a
client script:

```js
import init, { ping } from "../../rust/crates/binary-search/pkg/binary_search.js";

await init();          // loads and instantiates the .wasm
console.log(ping());
```

When the Astro session lands, we'll decide where the built `pkg/` should live
relative to Astro's `src/` (a symlink, a copy step, or pointing Vite at this
path). Nothing here assumes a particular Astro layout yet.

## Returning structured data (e.g. a "step") to JS

Two options when you need to hand a struct back across the wasm boundary:

1. **`#[wasm_bindgen]` on the struct** — fields become JS getters. No extra deps.
2. **serde** — add `serde = { version = "1", features = ["derive"] }` and
   `serde-wasm-bindgen = "0.6"`, then return
   `serde_wasm_bindgen::to_value(&step)?` as a `JsValue`. Best when a step
   carries vecs/nested data you want as a plain JS object.

The `binary-search` crate currently pulls in neither beyond `wasm-bindgen` —
add what your design needs.
