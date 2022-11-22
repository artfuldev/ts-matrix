import { Matrix, n } from "../matrix";
import { multiply } from "../multiply";
import { scale } from "./elementary";

/**
 * Scales a specified column in the matrix by a scalar.
 * @example
 * const a = vec(vec(1, 2, 3), vec(0, 0, 0), vec(1, 4, 9));
 * // [[2, 2, 3], [0, 0, 0], [2, 4, 9]]
 * scale(0)(2)(a);
 */
export const scale_column =
  (a: number) =>
  (k: number) =>
  <M extends number, N extends number>(x: Matrix<M, N>): Matrix<M, N> =>
    multiply(scale(a)(k)(n(x)))(x);
