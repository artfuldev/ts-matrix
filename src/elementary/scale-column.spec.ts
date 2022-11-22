import { expect } from "chai";
import { row } from "../row";
import { scale_column } from "./scale-column";

describe("scale_column", () => {
  describe("given an index", () => {
    const a = 1;

    describe("given a scale factor", () => {
      const k = 2;

      describe("given a matrix with column index", () => {
        const m = row(1, 2, 3);

        it("should scale the row", () => {
          expect(scale_column(a)(k)(m)).to.deep.equal(row(1, 4, 3));
        });
      });

      describe("given a matrix without column index", () => {
        const m = row(1);

        it("should return original matrix", () => {
          expect(scale_column(a)(k)(m)).to.deep.equal(m);
        });
      });
    });
  });
});
