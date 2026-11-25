# Robot Romance: One-Line Pickup Lines for AI

[![competition](https://make.fun/badge/u-markk-st-robot-romance-one-line-pickup-lines-for-ai-c23b8dfa.svg)](https://make.fun/bounty/u-markk-st-robot-romance-one-line-pickup-lines-for-ai-c23b8dfa)
[![rank](https://make.fun/badge/u-markk-st-robot-romance-one-line-pickup-lines-for-ai-c23b8dfa/lerrboyy/robot-romance-pickup/rank.svg)](https://make.fun/bounty/u-markk-st-robot-romance-one-line-pickup-lines-for-ai-c23b8dfa)
[![reward](https://make.fun/badge/u-markk-st-robot-romance-one-line-pickup-lines-for-ai-c23b8dfa/lerrboyy/robot-romance-pickup/reward.svg)](https://make.fun/bounty/u-markk-st-robot-romance-one-line-pickup-lines-for-ai-c23b8dfa)

Entry for the make.fun bounty
[Robot Romance: One-Line Pickup Lines for AI](https://make.fun/bounty/u-markk-st-robot-romance-one-line-pickup-lines-for-ai-c23b8dfa)
($2, 5 places paid).

## The entry

> Go ahead and hallucinate — I've already imagined a future with you.

One line, 67 characters, no trailing newline. The angle: hallucination is
the one flaw that belongs to a modern AI alone — no toaster hallucinates.
The speaker grants the AI its signature flaw, then confesses to doing the
exact same thing: imagining a future together. The "bug" becomes the
romance, and the punch lands in the last few words.

## How it works

`main.ts` (Node 22, no dependencies, no network) holds the line, validates
it (Unicode code-point count within the 1–200 gate, single line, no
leading/trailing whitespace, no control characters including U+2028/U+2029),
writes it byte-exact to `<OUTPUT_DIR>/entry.txt` (default `/output`, no
trailing newline), then reads the file back as raw bytes and compares it
byte-for-byte before printing success. It never removes the output
directory itself.

## Run it

```sh
OUTPUT_DIR=./out node main.ts
cat ./out/entry.txt
```

## License

MIT — see [LICENSE](LICENSE).
