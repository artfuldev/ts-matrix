import { Nullable, Sum, Unwrap, TupleOf, Size } from "./tuple";

export type Vector<A, S extends number> = TupleOf<A, S> & { length: S };

export const vector =
  <S extends number>(size: S) =>
  <A>(ras: readonly A[]): Nullable<Vector<A, S>> =>
    [ras]
      .filter((as) => as.length === size)
      .map<Vector<A, S>>((as) => as as Vector<A, S>)
      .pop() ?? null;

export const vec = <T extends any[]>(...as: T): Vector<Unwrap<T>, Size<T>> =>
  as as Vector<Unwrap<T>, Size<T>>;

export const append =
  <A, T extends number>(vat: Vector<A, T>) =>
  <S extends number>(vas: Vector<A, S>): Vector<A, Sum<T, S>> =>
    vas.concat(vat) as Vector<A, Sum<T, S>>;
