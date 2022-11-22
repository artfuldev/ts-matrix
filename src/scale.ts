import { Matrix } from "./matrix";

/**
 * Scales a matrix by a specified scalar value.
 * @param c The constant to scale the matrix by
 * @returns A function that scales its input matrix by the provided scalar `c`.
 * @example
 * const a = vec(vec(1, 2), vec(0, 0));
 * // [[12, 24], [0, 0]]
 * scale(12)(a);
 */
export const scale =
  (c: number) =>
  <M extends number, N extends number>(a: Matrix<M, N>): Matrix<M, N> =>
    a.map((r) => r.map((x) => x * c)) as Matrix<M, N>;
