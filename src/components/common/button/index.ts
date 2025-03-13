import { cva } from "../../../libs/cva";

import styles from "./button.module.css";

export const button = cva(styles.base, {
  variants: {
    kind: {
      bold: styles.bold,
      soft: styles.soft,
      line: styles.line,
      text: styles.text,
      bold_f: styles.bold_f,
      soft_f: styles.soft_f,
      line_f: styles.line_f,
      text_f: styles.text_f,
      tab: styles.tab,
    },
    size: {
      small: styles.small,
      regular: styles.regular,
      large: styles.large,
      auto: "",
    },
    justifyContent: {
      center: styles.center,
      start: styles.start,
      end: styles.end,
    },
    active: {
      true: styles.active,
      false: "",
    },
    buttonText: {
      true: styles.button_text,
      false: "",
    },
  },
  defaultVariants: {
    kind: "soft",
    size: "regular",
    justifyContent: "center",
    active: false,
    buttonText: true,
  },
});
