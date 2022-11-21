export type Nullable<A> = A | null;

type _TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>;

export type TupleOf<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never;

export type Unwrap<T extends any[]> = T extends TupleOf<infer A, number>
  ? A
  : never;

export type Size<T extends any[]> = T extends TupleOf<unknown, number>
  ? T["length"] extends number
    ? T["length"]
    : never
  : never;

export type Sum<A extends number, B extends number> = Size<
  [...TupleOf<unknown, A>, ...TupleOf<unknown, B>]
>;
