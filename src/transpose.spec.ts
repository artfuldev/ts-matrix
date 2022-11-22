import { expect } from "chai";
import { transpose } from "./transpose";
import { vec } from "@artfuldev/ts-vector";

describe("transpose", () => {
  describe("given a matrix", () => {
    const m = vec(vec(1, 2, 3), vec(4, 5, 6));

    it("should return the rows as columns", () => {
      expect(transpose(m)).to.deep.equal(vec(vec(1, 4), vec(2, 5), vec(3, 6)));
    });

    it("should return its input when applied twice", () => {
      expect(transpose(transpose(m))).to.deep.equal(m);
    });
  });
});
