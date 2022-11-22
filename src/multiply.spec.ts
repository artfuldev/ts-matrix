import { expect } from "chai";
import { multiply } from "./multiply";
import { vec } from "@artfuldev/ts-vector";

describe("multiply", () => {
  describe("given a matrix n x p", () => {
    const b = vec(vec(0, 1000), vec(1, 100), vec(0, 10));

    describe("given another matrix m x n", () => {
      const a = vec(vec(2, 3, 4), vec(1, 0, 0));

      it("should return the product matrix", () => {
        expect(multiply(b)(a)).to.deep.equal([
          [3, 2340],
          [0, 1000],
        ]);
      });

      it("should return a matrix with m rows", () => {
        expect(multiply(b)(a).length).to.deep.equal(a.length);
      });

      it("should return a matrix with p columns", () => {
        expect(multiply(b)(a)[0].length).to.deep.equal(b[0].length);
      });
    });
  });
});
