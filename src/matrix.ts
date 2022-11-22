import { Size } from "./tuple";
import { vec, Vector } from "./vector";

export type Matrix<M extends number, N extends number> = Vector<
  Vector<number, N>,
  M
>;

const m = <M extends number>(x: Matrix<M, any>): M => x.length;

const n = <N extends number>(x: Matrix<any, N>): N => (x[0] ?? []).length;

export const zeros =
  <M extends number>(m: M) =>
  <N extends number>(n: N): Matrix<M, N> =>
    new Array(m).fill(new Array(n).fill(0)) as Matrix<M, N>;

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

export const add =
  <M extends number, N extends number>(b: Matrix<M, N>) =>
  <M extends number>(a: Matrix<M, N>): Matrix<M, N> =>
    a.map((r, i) => r.map((x, j) => x + b[i][j])) as Matrix<M, N>;

export const scale =
  (c: number) =>
  <M extends number, N extends number>(a: Matrix<M, N>): Matrix<M, N> =>
    a.map((r) => r.map((x) => x * c)) as Matrix<M, N>;

export const transpose = <M extends number, N extends number>(
  x: Matrix<M, N>
): Matrix<N, M> =>
  zeros(n(x))(m(x)).map((t, j) => t.map((_, i) => x[i][j])) as Matrix<N, M>;

export type Row<N extends number> = Matrix<1, N>;

export const row = <T extends number[]>(...as: T): Row<Size<T>> =>
  vec(vec(...as));

export type Column<M extends number> = Matrix<M, 1>;

export const column = <T extends number[]>(...as: T): Column<Size<T>> =>
  transpose(row(...as));

export type Square<N extends number> = Matrix<N, N>;

export const diagonal = <T extends number[]>(...as: T): Square<T["length"]> =>
  zeros(as.length)(as.length).map((r, i) =>
    r.map((_, j) => (i === j ? as[i] : 0))
  ) as Square<T["length"]>;

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

export const switch_rows =
  (a: number) =>
  (b: number) =>
  <M extends number, N extends number>(x: Matrix<M, N>): Matrix<M, N> =>
    multiply(x)(elementary_switch(a)(b)(m(x)));

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

export const scale_row =
  (a: number) =>
  (k: number) =>
  <M extends number, N extends number>(x: Matrix<M, N>): Matrix<M, N> =>
    multiply(x)(elementary_scale(a)(k)(m(x)));

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

export const add_row =
  (a: number) =>
  (b: number) =>
  (k: number) =>
  <M extends number, N extends number>(x: Matrix<M, N>): Matrix<M, N> =>
    multiply(x)(elementary_add(a)(b)(k)(m(x)));

export const add_column =
  (a: number) =>
  (b: number) =>
  (k: number) =>
  <M extends number, N extends number>(x: Matrix<M, N>): Matrix<M, N> =>
    multiply(elementary_add(b)(a)(k)(n(x)))(x);
