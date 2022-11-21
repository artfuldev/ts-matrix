import { Nullable, Sum, Unwrap, TupleOf, Size } from "./tuple";

const __vector = Symbol("The vector type");

export interface Vector<A, S extends number> {
  __type: typeof __vector;
  readonly as: TupleOf<A, S>;
}

export const vector =
  <S extends number>(size: S) =>
  <A>(ras: readonly A[]): Nullable<Vector<A, S>> =>
    [ras]
      .filter((as) => as.length === size)
      .map<Vector<A, S>>((as) => ({
        __type: __vector,
        size,
        as: as as TupleOf<A, S>,
      }))
      .pop() ?? null;

export const vec = <T extends any[]>(
  ...as: T
): Vector<Unwrap<T>, Size<T>> => ({
  __type: __vector,
  as: as as TupleOf<Unwrap<T>, Size<T>>,
});

export const append =
  <A, T extends number>({ as: tas }: Vector<A, T>) =>
  <S extends number>({ as: sas }: Vector<A, S>): Vector<A, Sum<T, S>> => ({
    __type: __vector,
    as: [...sas, ...tas] as TupleOf<A, Sum<T, S>>,
  });
