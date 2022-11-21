import { Size, TupleOf, Unwrap } from "./tuple";
import { vec, vector, Vector } from "./vector";

export type Matrix<A, M extends number, N extends number> = Vector<
  Vector<A, N>,
  M
>;

export const array_2d = <A, M extends number, N extends number>(
  x: Matrix<A, M, N>
): TupleOf<TupleOf<A, N>, M> =>
  x.as.map((v) => v.as) as TupleOf<TupleOf<A, N>, M>;

export type Row<A, N extends number> = Matrix<A, 1, N>;

export const row = <T extends any[]>(...as: T): Row<Unwrap<T>, Size<T>> =>
  vec(vec(...as));

export type Column<A, M extends number> = Matrix<A, M, 1>;

export const column = <T extends any[]>(...as: T): Column<Unwrap<T>, Size<T>> =>
  vector(as.length)(as.map((a) => vec(a)))! as unknown as Vector<
    Vector<Unwrap<T>, 1>,
    Size<T>
  >;

export const dot =
  <N extends number, P extends number>(b: Matrix<number, N, P>) =>
  <M extends number>(a: Matrix<number, M, N>): Matrix<number, M, P> =>
    null as any;
