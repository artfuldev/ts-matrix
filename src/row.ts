import { Size, vec, Vector } from "@artfuldev/ts-vector";
import { Matrix } from "./matrix";

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
