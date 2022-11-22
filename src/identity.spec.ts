import { expect } from "chai";
import { identity } from "./identity";
import { vec } from "@artfuldev/ts-vector";

describe("identity", () => {
  describe("given a scalar value", () => {
    const n = 2;

    it("should return a matrix with n rows", () => {
      expect(identity(n).length).to.equal(n);
    });

    it("should return a matrix wih only 0s and 1s", () => {
      expect(identity(n).every((r) => r.every((x) => x === 0 || x === 1))).to.be
        .true;
    });

    it("should return a matrix with only 1 in the main diagonal", () => {
      const m = identity(n);
      expect(
        new Array(n)
          .fill(0)
          .flatMap((_, i) => new Array(n).fill(0).map((_, j) => vec(i, j)))
          .filter(([i, j]) => i === j)
          .every(([i, j]) => m[i][j] === 1)
      ).to.be.true;
    });

    it("should return a matrix with only 0 everywhere else", () => {
      const m = identity(n);
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
