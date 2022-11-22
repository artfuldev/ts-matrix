import { m, Matrix } from "../matrix";
import { multiply } from "../multiply";
import { add } from "./elementary";

/**
 * Adds a scaled version of a source row into a target row.
 * @example
 * const a = vec(vec(1, 2, 3), vec(0, 0, 0), vec(1, 4, 9));
 * // [[1, 2, 3], [-2, -4, -6], [1, 4, 9]]
 * scale(1)(0)(-2)(a);
 */
export const add_row =
  (target: number) =>
  (source: number) =>
  (k: number) =>
  <M extends number, N extends number>(mn: Matrix<M, N>): Matrix<M, N> =>
    multiply(mn)(add(target)(source)(k)(m(mn)));
