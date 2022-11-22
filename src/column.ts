import { Size } from "@artfuldev/ts-vector";
import { Matrix } from "./matrix";
import { row } from "./row";
import { transpose } from "./transpose";


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

