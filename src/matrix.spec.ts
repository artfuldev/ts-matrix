import { expect } from "chai";
import { zeros } from "./matrix";

describe("zeros", () => {
  describe("given a row count", () => {
    const m = 3;

    describe("given a column count", () => {
      const n = 2;

      it("should return a matrix with given number of rows", () => {
        expect(zeros(m)(n).length).to.equal(m);
      });

      it("should return a matrix with given number of columns", () => {
        expect(zeros(m)(n).every((r) => r.length === n)).to.be.true;
      });

      it("should have all zeros", () => {
        expect(zeros(m)(n).every((r) => r.every((x) => x === 0))).to.be.true;
      });
    });
  });
});
