import { Matrix, n } from "../matrix";
import { multiply } from "../multiply";
import { add } from "./elementary";

/**
 * Adds a scaled version of a source column into a target column.
 * @example
 * const a = vec(vec(1, 2, 3), vec(0, 0, 0), vec(1, 4, 9));
 * // [[1, 0, 3], [0, 0, 0], [1, 2, 9]]
 * scale(1)(0)(-2)(a);
 */
export const add_column =
  (target: number) =>
  (source: number) =>
  (k: number) =>
  <M extends number, N extends number>(mn: Matrix<M, N>): Matrix<M, N> =>
    multiply(add(source)(target)(k)(n(mn)))(mn);
