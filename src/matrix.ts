import { Size } from "./tuple";
import { vec, vector, Vector } from "./vector";

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

export type Row<N extends number> = Matrix<1, N>;

export const row = <T extends number[]>(...as: T): Row<Size<T>> =>
  vec(vec(...as));

export type Column<M extends number> = Matrix<M, 1>;

export const column = <T extends number[]>(...as: T): Column<Size<T>> =>
  vector(as.length)(as.map((a) => vec(a)))! as Column<Size<T>>;

export const dot =
  <N extends number, P extends number>(b: Matrix<N, P>) =>
  <M extends number>(a: Matrix<M, N>): Matrix<M, P> =>
    null as any;

export const sum =
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
