import { expect } from "chai";
import { scale } from "./scale";
import { vec } from "@artfuldev/ts-vector";

describe("scale", () => {
  describe("given a scalar value", () => {
    const c = 2;

    describe("given a matrix", () => {
      const a = vec(vec(1, 2, 3), vec(4, 5, 6));

      it("should return the element-wise product", () => {
        expect(
          scale(c)(a).every((r, i) => r.every((x, j) => x === c * a[i][j]))
        ).to.be.true;
      });
    });
  });
});
