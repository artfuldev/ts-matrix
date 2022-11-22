import { expect } from "chai";
import { column } from "../column";
import { add_row } from "./add-row";

describe("add_row", () => {
  describe("given a target row index", () => {
    const a = 2;

    describe("given a source row index", () => {
      const b = 1;

      describe("given a scale factor", () => {
        const k = 2;

        describe("given a matrix with the row indices", () => {
          const m = column(1, 2, 3);

          it("should add the rows", () => {
            expect(add_row(a)(b)(k)(m)).to.deep.equal(column(1, 2, 7));
          });
        });

        describe("given a matrix without the row indices", () => {
          const m = column(1, 2);

          it("should return the original matrix", () => {
            expect(add_row(a)(b)(k)(m)).to.deep.equal(m);
          });
        });
      });
    });
  });
});
