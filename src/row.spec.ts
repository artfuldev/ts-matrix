import { expect } from "chai";
import { row } from "./row";

describe("row", () => {
  describe("given items", () => {
    const items = [1, 2, 3];

    it("should return a row vector", () => {
      expect(row(...items)).to.deep.equal([items]);
    });
  });
});
