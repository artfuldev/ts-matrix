import { expect } from "chai";
import { vec, vector } from "./vector";

describe("vector", () => {
  describe("vector", () => {
    describe("given a size", () => {
      const size = 2;
      describe("given an array of equal size", () => {
        const array = [1, 2];

        it("should create a vector", () => {
          expect(vector(size)(array)).to.not.be.null;
        });

        it("should contain the provided array", () => {
          expect(vector(size)(array)?.as).to.deep.equal(array);
        });
      });

      describe("given an array of different size", () => {
        const array = [1, 2, 3];

        it("should not create a vector", () => {
          expect(vector(size)(array)).to.be.null;
        });
      });
    });
  });

  describe("vec", () => {
    describe("given items", () => {
      const items = [1, 2, 3];
      it("should create a vector", () => {
        expect(vec(...items)).to.not.be.null;
      });

      it("should contain the items", () => {
        expect(vec(...items).as).to.deep.equal(items);
      });
    });
  });
});
