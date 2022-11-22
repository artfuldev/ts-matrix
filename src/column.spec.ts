import { expect } from "chai";
import { column } from "./column";

describe("column", () => {
  describe("given items", () => {
    const items = [1, 2, 3];

    it("should return a column vector", () => {
      expect(column(...items)).to.deep.equal([[1], [2], [3]]);
    });
  });
});
