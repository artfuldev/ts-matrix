import { expect } from "chai";
import { column } from "../column";
import { scale_row } from "./scale-row";

describe("scale_row", () => {
  describe("given an index", () => {
    const a = 1;

    describe("given a scale factor", () => {
      const k = 2;

      describe("given a matrix with row index", () => {
        const m = column(1, 2, 3);

        it("should scale the row", () => {
          expect(scale_row(a)(k)(m)).to.deep.equal(column(1, 4, 3));
        });
      });

      describe("given a matrix without row index", () => {
        const m = column(1);

        it("should return original matrix", () => {
          expect(scale_row(a)(k)(m)).to.deep.equal(m);
        });
      });
    });
  });
});
