import { Matrix, n } from "../matrix";
import { multiply } from "../multiply";
import { swap } from "./elementary";

/**
 * Switches columns a and b of a matrix.
 * @example
 * const a = vec(vec(1, 2, 3), vec(0, 0, 0), vec(1, 4, 9));
 * // [[1, 3, 2], [0, 0, 0], [1, 9, 4]]
 * switch_columns(1)(2)(a);
 */
export const switch_columns =
  (a: number) =>
  (b: number) =>
  <M extends number, N extends number>(x: Matrix<M, N>): Matrix<M, N> =>
    multiply(swap(a)(b)(n(x)))(x);
