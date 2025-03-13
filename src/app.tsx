import { FormEvent, useState } from "react";
import { MdClear, MdOutlineSubdirectoryArrowLeft } from "react-icons/md";

import styles from "./app.module.css";
import { button } from "./components/common/button";

export default function App() {
  const [script, setScript] = useState("");
  const [roman, setRoman] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const f = e.target as any;
    const prompt = f["prompt"].value as string;
    const feedback = f["feedback"] as HTMLOutputElement;

    if (prompt.trim() == "") {
      const WS = roman[roman.length - 1] == " " ? "\n" : " ";
      setScript((s) => s + WS);
      setRoman((s) => s + WS);
      feedback.innerHTML = "";
      f.reset();
      return;
    }
    const script = REJANG_SCRIPT[prompt.toLocaleLowerCase()];
    if (!script || script == "INVALID") {
      feedback.innerHTML = "Invalid character";
      return;
    }

    setScript((s) => s + script);
    setRoman((s) => s + prompt);
    feedback.innerHTML = "";
    f.reset();
  }

  function handleClear(e: any) {
    setScript("");
    setRoman("");
    const f = e.target.form;
    if (f) {
      f.reset();
      f["feedback"].innerHTML = "";
    }
  }

  const subtitle = [
    "\uA933\uA948\uA93E\uA947\uA93C\uA950",
    "\uA93D\uA93A\uA94F",
  ];

  return (
    <main className={styles["main"]}>
      <hgroup>
        <h1 className={styles["title"]}>Tulisan Rejang</h1>
        <span className={styles["sub-title"]}>{subtitle.join(" ")}</span>
      </hgroup>

      <ul>
        <li>
          Type in the roman syllable equivalent of each Rejang character into
          the text box.
        </li>
        <li>Press ENTER to add one Rejang character.</li>
        <li>
          Press ENTER on an empty input box to insert a SPACE. Press ENTER twice
          to insert new line.
        </li>
        <li>Type "." and press ENTER to insert section mark.</li>
        <li>
          Refer to{" "}
          <a
            target="_blank"
            href="https://www.unicode.org/charts/PDF/UA930.pdf"
          >
            UNICODE reference on Rejang script
          </a>
          .
        </li>
      </ul>

      <details>
        <summary>Accepted syllables</summary>
        <div>{Object.keys(REJANG_SCRIPT).join(" ")}</div>
      </details>

      <div className={styles["script-area"]}>{script}</div>

      <div className={styles["roman-area"]}>{roman}</div>

      <form onSubmit={handleSubmit}>
        <input name="prompt" placeholder="Type a syllable here" />
        <button type="submit" className={button({ kind: "bold" })}>
          <MdOutlineSubdirectoryArrowLeft size={20} />
        </button>
        <button
          type="button"
          className={button({ kind: "soft" })}
          onClick={handleClear}
        >
          <MdClear size={20} />
        </button>
        <output name="feedback"></output>
      </form>

      <div className={styles["footer"]}>
        <a href="">Github</a>
      </div>
    </main>
  );
}

const REJANG_CONSONANTS: Pair[] = [
  ["k", "\uA930"],
  ["g", "\uA931"],
  ["ng", "\uA932"],
  ["t", "\uA933"],
  ["d", "\uA934"],
  ["n", "\uA935"],
  ["p", "\uA936"],
  ["b", "\uA937"],
  ["m", "\uA938"],
  ["c", "\uA939"],
  ["j", "\uA93A"],
  ["ny", "\uA93B"],
  ["s", "\uA93C"],
  ["r", "\uA93D"],
  ["l", "\uA93E"],
  ["y", "\uA93F"],
  ["w", "\uA940"],
  ["w", "\uA941"],
  ["mb", "\uA942"],
  ["ngg", "\uA943"],
  ["nd", "\uA944"],
  ["nyj", "\uA945"],
  ["mp", "\uA942"],
  ["ngk", "\uA943"],
  ["nt", "\uA944"],
  ["nyc", "\uA945"],
  ["O", "\uA946"],
  [".", "\uA95F"],
];

const REJANG_VOWELS: Pair[] = [
  ["a", ""],
  ["i", "\uA947"],
  ["u", "\uA948"],
  ["e", "\uA949"],
  ["ai", "\uA94A"],
  ["o", "\uA94B"],
  ["au", "\uA94C"],
  ["eu", "\uA94D"],
  ["ea", "\uA94E"],
  ["", "\uA953"],
];

const REJANG_CODA: Record<string, string> = {
  ng: "\uA94F",
  n: "\uA950",
  r: "\uA951",
  h: "\uA952",
};

type Pair = [string, string];

function processSyllable(cons: Pair, vow: Pair): Pair {
  if (cons[0] == "O") {
    if (vow[0] == "") {
      return ["a", cons[1]];
    } else {
      return [vow[0], cons[1] + vow[1]];
    }
  }
  if (cons[0] == ".") {
    return cons;
  }
  return [cons[0] + vow[0], cons[1] + vow[1]];
}

const REJANG_SCRIPT: Record<string, string> = {
  ...Object.fromEntries(
    REJANG_CONSONANTS.flatMap((cons) =>
      REJANG_VOWELS.map((vow) => processSyllable(cons, vow))
    )
  ),
  ...REJANG_CODA,
};
