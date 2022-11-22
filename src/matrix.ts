import { Vector } from "@artfuldev/ts-vector";

/**
 * A 2 dimensional vector of numbers.
 */
export type Matrix<M extends number, N extends number> = Vector<
  Vector<number, N>,
  M
>;

/**
 * Gets the number of rows of the matrix.
 * @param x The input matrix.
 * @returns The number of rows of the matrix.
 */
export const m = <M extends number>(x: Matrix<M, any>): M => x.length;

/**
 * Gets the number of columns of the matrix.
 * @param x The input matrix.
 * @returns The number of columns of the matrix.
 */
export const n = <N extends number>(x: Matrix<any, N>): N =>
  (x[0] ?? []).length;

/**
 * Creates a matrix of a given number of rows and columns filled with zeros.
 * @param m The number of rows of the matrix.
 * @returns A function that takes a number of columns of the matrix to create a
 * matrix of zeros of the specified size.
 * @example
 * // [[0, 0], [0, 0], [0, 0]]
 * zeros(3)(2);
 */
export const zeros =
  <M extends number>(m: M) =>
  <N extends number>(n: N): Matrix<M, N> =>
    new Array(m).fill(new Array(n).fill(0)) as Matrix<M, N>;
