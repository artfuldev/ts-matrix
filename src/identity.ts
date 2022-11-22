import { diagonal, Square } from "./diagonal";

/**
 * Creates an identity matrix of the specified size.
 * @param n The size of the identity matrix.
 * @returns An identity matrix of the specified size.
 * @example
 * // [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
 * identity(3)
 */
export const identity = <N extends number>(n: N): Square<N> =>
  diagonal(...new Array(n).fill(1)) as Square<N>;
