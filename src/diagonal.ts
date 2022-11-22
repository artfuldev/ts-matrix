import { Matrix, zeros } from "./matrix";

/**
 * A square matrix, a matrix having an equal number of rows and columns.
 */
export type Square<N extends number> = Matrix<N, N>;

/**
 *
 * @param as The values of the diagonal.
 * @returns A square matrix containing zeros except for the provided values
 * along its major diagonal.
 * @example
 * // [[1, 0, 0], [0, 4, 0], [0, 0, 9]]
 * diagonal(1, 4, 9);
 */
export const diagonal = <T extends number[]>(...as: T): Square<T["length"]> =>
  zeros(as.length)(as.length).map((r, i) =>
    r.map((_, j) => (i === j ? as[i] : 0))
  ) as Square<T["length"]>;
