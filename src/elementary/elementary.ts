import { diagonal, Square } from "../diagonal";
import { identity } from "../identity";
import { Matrix } from "../matrix";
import { multiply } from "../multiply";

const within = (a: number, b: number) => (x: number) => x >= a && x < b;

export const swap =
  (a: number) =>
  (b: number) =>
  <N extends number>(n: N): Square<N> =>
    within(0, n)(a) && within(0, n)(b)
      ? (identity(n).map((r, i, m) =>
          i === a ? m[b] : i === b ? m[a] : r
        ) as Square<N>)
      : identity(n);

export const scale =
  (a: number) =>
  (k: number) =>
  <N extends number>(n: N): Square<N> =>
    within(0, n)(a)
      ? (diagonal(
          ...new Array(n).fill(1).map((x, i) => (i === a ? k : x))
        ) as Square<N>)
      : identity(n);

export const add =
  (a: number) =>
  (b: number) =>
  (k: number) =>
  <N extends number>(n: N): Square<N> =>
    within(0, n)(a) && within(0, n)(b)
      ? (identity(n).map((r, i) =>
          r.map((x, j) => (i === a && j === b ? k : x))
        ) as Square<N>)
      : identity(n);

