import { expect } from "chai";
import { diagonal } from "./diagonal";
import { vec } from "@artfuldev/ts-vector";

describe("diagonal", () => {
  describe("given a list of diagonal elements", () => {
    const d = [1, 2, 3];
    const n = d.length;

    it("should return a matrix with n rows", () => {
      expect(diagonal(...d).length).to.equal(n);
    });

    it("should return a matrix with the main diagonal", () => {
      const m = diagonal(...d);
      expect(
        new Array(n)
          .fill(0)
          .flatMap((_, i) => new Array(n).fill(0).map((_, j) => vec(i, j)))
          .filter(([i, j]) => i === j)
          .map(([i, j]) => m[i][j])
      ).to.deep.equal(d);
    });

    it("should return a matrix with only 0 everywhere else", () => {
      const m = diagonal(...d);
      expect(
        new Array(n)
          .fill(0)
          .flatMap((_, i) => new Array(n).fill(0).map((_, j) => vec(i, j)))
          .filter(([i, j]) => i !== j)
          .every(([i, j]) => m[i][j] === 0)
      ).to.be.true;
    });
  });
});
