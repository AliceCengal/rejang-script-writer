import { createElement, CSSProperties, PropsWithChildren } from "react";

type BoxProps = PropsWithChildren<
  CSSProperties & { as?: keyof HTMLElementTagNameMap; className?: string }
>;

export function Flex({
  as = "div",
  children,
  className,
  ...cssProps
}: BoxProps) {
  cssProps.display = "flex";
  return createElement(as, { className, style: cssProps }, children);
}

export function Grid({
  as = "div",
  children,
  className,
  ...cssProps
}: BoxProps) {
  cssProps.display = "grid";
  return createElement(as, { className, style: cssProps }, children);
}

export function Box({
  as = "div",
  children,
  className,
  ...cssProps
}: BoxProps) {
  return createElement(as, { className, style: cssProps }, children);
}
