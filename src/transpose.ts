import { m, Matrix, n, zeros } from "./matrix";

/**
 * Transposes a matrix by swapping its rows and columns.
 * @param x The input matrix.
 * @returns The transposed matrix.
 * @example
 * const a = vec(vec(1, 2), vec(0, 0), vec(3, 4));
 * // [[1, 0, 3], [2, 0, 4]]
 * transpose(a);
 */
export const transpose = <M extends number, N extends number>(
  x: Matrix<M, N>
): Matrix<N, M> =>
  zeros(n(x))(m(x)).map((t, j) => t.map((_, i) => x[i][j])) as Matrix<N, M>;
