import { expect } from "chai";
import { add } from "./add";
import { vec } from "@artfuldev/ts-vector";

describe("add", () => {
  describe("given a matrix", () => {
    const a = vec(vec(1, 2, 3), vec(4, 5, 6));

    describe("given another matrix with the same dimensions", () => {
      const b = vec(vec(1, 2, 3), vec(4, 5, 6));

      it("should return the element-wise sum", () => {
        expect(add(b)(a)).to.deep.equal(vec(vec(2, 4, 6), vec(8, 10, 12)));
      });
    });
  });
});
