import { m, Matrix, n, zeros } from "./matrix";

/**
 * Multiplies a matrix B with another matrix A to return AB. The number of rows
 * of matrix B must match the number of columns of the matrix A.
 * @param b The right matrix B.
 * @returns A function that right-multiplies the provided matrix B with any
 * matrix A.
 * @example
 * const b = vec(vec(0, 1000), vec(1, 100), vec(0, 10));
 * const a = vec(vec(2, 3, 4), vec(1, 0, 0));
 * // [[3, 2340], [0, 1000]]
 * multiply(b)(a);
 */
export const multiply =
  <N extends number, P extends number>(b: Matrix<N, P>) =>
  <M extends number>(a: Matrix<M, N>): Matrix<M, P> =>
    zeros(m(a))(n(b)).map((c, i) =>
      c.map((_, j) =>
        new Array(n(a))
          .fill(0)
          .map((_, r) => a[i][r] * b[r][j])
          .reduce((x, y) => x + y, 0)
      )
    ) as Matrix<M, P>;
