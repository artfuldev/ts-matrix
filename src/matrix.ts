import { Size } from "./tuple";
import { vec, vector, Vector } from "./vector";

export type Matrix<M extends number, N extends number> = Vector<
  Vector<number, N>,
  M
>;

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

export const transpose = <M extends number, N extends number>(
  m: Matrix<M, N>
): Matrix<N, M> =>
  new Array((m[0] ?? []).length)
    .fill(0)
    .map((_, j) =>
      new Array(m.length).fill(0).map((_, i) => m[i][j])
    ) as Matrix<N, M>;
