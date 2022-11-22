import { Nullable, Sum, Unwrap, TupleOf, Size } from "./tuple";

/**
 * A fixed-length array of values, inferred when possible.
 */
export type Vector<A, S extends number> = TupleOf<A, S> & { length: S };

/**
 * Creates a vector from an array of values.
 * @param size The expected size of the vector.
 * @returns A constructor that can optionally return a vector of the specified
 * size from any array.
 * @example
 * const vector3 = vector(3);
 * // null
 * vector3([1, 2, 3, 4]);
 * // [1, 2, 3]
 * vector3([1, 2, 3]);
 */
export const vector =
  <S extends number>(size: S) =>
  <A>(ras: readonly A[]): Nullable<Vector<A, S>> =>
    [ras]
      .filter((as) => as.length === size)
      .map<Vector<A, S>>((as) => as as Vector<A, S>)
      .pop() ?? null;

/**
 * Creates a vector from values.
 * @param as Values that belong to this vector.
 * @returns A vector containing the provided values.
 * @example
 * // [1, 2, 3]: Vector<number, 3>
 * vec(1, 2, 3);
 */
export const vec = <T extends any[]>(...as: T): Vector<Unwrap<T>, Size<T>> =>
  as as Vector<Unwrap<T>, Size<T>>;

/**
 * Appends values from a source vector to a target vector.
 * @param source The source vector.
 * @returns A function that appends the source vector to any target vector.
 * 
 * @example
 * const a = vec(1, 2, 3)
 * const b = vec(4, 5, 6)
 * // [1, 2, 3, 4, 5, 6]
 * const x = append(b)(a);
 */
export const append =
  <A, T extends number>(source: Vector<A, T>) =>
  <S extends number>(target: Vector<A, S>): Vector<A, Sum<T, S>> =>
    target.concat(source) as Vector<A, Sum<T, S>>;
