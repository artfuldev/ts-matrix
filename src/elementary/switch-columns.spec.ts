import { expect } from "chai";
import { row } from "../row";
import { switch_columns } from "./switch-columns";

describe("switch_columns", () => {
  describe("given column indices", () => {
    const a = 1;
    const b = 2;

    describe("given a matrix with row indices", () => {
      const m = row(1, 2, 3);

      it("should return swapped matrix", () => {
        expect(switch_columns(a)(b)(m)).to.deep.equal(row(1, 3, 2));
      });
    });

    describe("given a matrix without row indices", () => {
      const m = row(1, 2);

      it("should return original matrix", () => {
        expect(switch_columns(a)(b)(m)).to.deep.equal(m);
      });
    });
  });
});
