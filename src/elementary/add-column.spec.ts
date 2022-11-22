import { expect } from "chai";
import { row } from "../row";
import { add_column } from "./add-column";

describe("add_column", () => {
  describe("given a target column index", () => {
    const a = 2;

    describe("given a source column index", () => {
      const b = 1;

      describe("given a scale factor", () => {
        const k = 2;

        describe("given a matrix with the column indices", () => {
          const m = row(1, 2, 3);

          it("should add the columns", () => {
            expect(add_column(a)(b)(k)(m)).to.deep.equal(row(1, 2, 7));
          });
        });

        describe("given a matrix without the column indices", () => {
          const m = row(1, 2);

          it("should return the original matrix", () => {
            expect(add_column(a)(b)(k)(m)).to.deep.equal(m);
          });
        });
      });
    });
  });
});
