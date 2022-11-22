import { expect } from "chai";
import { column } from "../column";
import { switch_rows } from "./switch-rows";

describe("switch_rows", () => {
  describe("given row indices", () => {
    const a = 1;
    const b = 2;

    describe("given a matrix with row indices", () => {
      const m = column(1, 2, 3);

      it("should return swapped matrix", () => {
        expect(switch_rows(a)(b)(m)).to.deep.equal(column(1, 3, 2));
      });
    });

    describe("given a matrix without row indices", () => {
      const m = column(1, 2);

      it("should return original matrix", () => {
        expect(switch_rows(a)(b)(m)).to.deep.equal(m);
      });
    });
  });
});
