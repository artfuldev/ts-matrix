import { Matrix } from "./matrix";

/**
 * Adds two matrices of the same dimensions.
 * @param b The matrix to be added.
 * @returns A function that adds the provided matrix to any matrix of the same
 * dimensions.
 * @example
 * const b = vec(vec(1, 2), vec(0, 0));
 * const a = vec(vec(0, 0), vec(1, 2));
 * // [[1, 2], [1, 2]]
 * add(b)(a);
 */
export const add =
  <M extends number, N extends number>(b: Matrix<M, N>) =>
  <M extends number>(a: Matrix<M, N>): Matrix<M, N> =>
    a.map((r, i) => r.map((x, j) => x + b[i][j])) as Matrix<M, N>;
