import { m, Matrix } from "../matrix";
import { multiply } from "../multiply";
import { swap } from "./elementary";

/**
 * Switches rows a and b of a matrix.
 * @example
 * const a = vec(vec(1, 2, 3), vec(0, 0, 0), vec(1, 4, 9));
 * // [[1, 2, 3], [1, 4, 9], [0, 0, 0]]
 * switch_rows(1)(2)(a);
 */
export const switch_rows =
  (a: number) =>
  (b: number) =>
  <M extends number, N extends number>(x: Matrix<M, N>): Matrix<M, N> =>
    multiply(x)(swap(a)(b)(m(x)));
