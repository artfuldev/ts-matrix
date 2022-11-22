import { Size, vec, Vector } from "@artfuldev/ts-vector";

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
const m = <M extends number>(x: Matrix<M, any>): M => x.length;

/**
 * Gets the number of columns of the matrix.
 * @param x The input matrix.
 * @returns The number of columns of the matrix.
 */
const n = <N extends number>(x: Matrix<any, N>): N => (x[0] ?? []).length;

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

/**
 * A row vector, a matrix having only 1 row.
 */
export type Row<N extends number> = Matrix<1, N>;

/**
 * Creates a row vector from a specified set of elements.
 * @param as  The values of the row vector.
 * @returns The row vector of the provided values.
 * @example
 * // [[1, 2, 3]]
 * row(1, 2, 3);
 */
export const row = <T extends number[]>(...as: T): Row<Size<T>> =>
  vec(vec(...as));

/**
 * A column vector, a matrix having only 1 column.
 */
export type Column<M extends number> = Matrix<M, 1>;

/**
 * Creates a column vector from a specified set of elements.
 * @param as The values of the column vector.
 * @returns The column vector of the provided values.
 * @example
 * // [[1], [2], [3]]
 * column(1, 2, 3);
 */
export const column = <T extends number[]>(...as: T): Column<Size<T>> =>
  transpose(row(...as));

/**
 * A square matrix, a matrix having an equal number of rows and columns.
 */
export type Square<N extends number> = Matrix<N, N>;

/**
 * 
 * @param as The values of the diagonal.
 * @returns A square matrix containing zeros except for the provided values
 * along its major diagonal.
 * @example
 * // [[1, 0, 0], [0, 4, 0], [0, 0, 9]]
 * diagonal(1, 4, 9);
 */
export const diagonal = <T extends number[]>(...as: T): Square<T["length"]> =>
  zeros(as.length)(as.length).map((r, i) =>
    r.map((_, j) => (i === j ? as[i] : 0))
  ) as Square<T["length"]>;

/**
 * Creates an identity matrix of the specified size.
 * @param n The size of the identity matrix.
 * @returns An identity matrix of the specified size.
 * @example
 * // [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
 * identity(3)
 */
export const identity = <N extends number>(n: N): Square<N> =>
  diagonal(...new Array(n).fill(1)) as Square<N>;

const within = (a: number, b: number) => (x: number) => x >= a && x < b;

const elementary_switch =
  (a: number) =>
  (b: number) =>
  <N extends number>(n: N): Square<N> =>
    within(0, n)(a) && within(0, n)(b)
      ? (identity(n).map((r, i, m) =>
          i === a ? m[b] : i === b ? m[a] : r
        ) as Square<N>)
      : identity(n);

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
    multiply(x)(elementary_switch(a)(b)(m(x)));

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
    multiply(elementary_switch(a)(b)(n(x)))(x);

const elementary_scale =
  (a: number) =>
  (k: number) =>
  <N extends number>(n: N): Square<N> =>
    within(0, n)(a)
      ? (diagonal(
          ...new Array(n).fill(1).map((x, i) => (i === a ? k : x))
        ) as Square<N>)
      : identity(n);

/**
 * Scales a specified row in the matrix by a scalar.
 * @example
 * const a = vec(vec(1, 2, 3), vec(0, 0, 0), vec(1, 4, 9));
 * // [[2, 4, 6], [0, 0, 0], [1, 4, 9]]
 * scale(0)(2)(a);
 */
export const scale_row =
  (a: number) =>
  (k: number) =>
  <M extends number, N extends number>(x: Matrix<M, N>): Matrix<M, N> =>
    multiply(x)(elementary_scale(a)(k)(m(x)));

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
    multiply(elementary_scale(a)(k)(n(x)))(x);

const elementary_add =
  (a: number) =>
  (b: number) =>
  (k: number) =>
  <N extends number>(n: N): Square<N> =>
    within(0, n)(a) && within(0, n)(b)
      ? (identity(n).map((r, i) =>
          r.map((x, j) => (i === a && j === b ? k : x))
        ) as Square<N>)
      : identity(n);

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
    multiply(mn)(elementary_add(target)(source)(k)(m(mn)));

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
    multiply(elementary_add(source)(target)(k)(n(mn)))(mn);
