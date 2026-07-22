use wasm_bindgen::prelude::*;

// ───────────────────────────────────────────────────────────────────────────
// PLACEHOLDER — delete this and write your binary search algorithm here.
//
// This one export exists only to prove the Rust → WASM pipeline compiles and
// loads in the browser. Once you've written the real thing, remove `ping`.
//
// A few notes for when you write the algorithm:
//   • Anything you want to call from JS gets `#[wasm_bindgen]`.
//   • To return a "step" struct to JS, you can either annotate a struct with
//     `#[wasm_bindgen]` (fields exposed via getters), or add `serde` +
//     `serde-wasm-bindgen` and return a plain serializable value. The README
//     has the details.
//   • Keep the algorithm in plain Rust and add `#[cfg(test)]` unit tests —
//     `cargo test` runs them natively, no wasm build required.
// ───────────────────────────────────────────────────────────────────────────
#[wasm_bindgen]
pub fn ping() -> String {
    "binary-search wasm module loaded".to_string()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn ping_works() {
        assert_eq!(ping(), "binary-search wasm module loaded");
    }
}
