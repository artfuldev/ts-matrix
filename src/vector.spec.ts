import { expect } from "chai";
import { append, vec, vector } from "./vector";

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

  describe("append", () => {
    describe("given a suffix", () => {
      const suffix = vec(4, 5, 6);

      describe("given a vector", () => {
        const items = vec(1, 2, 3);

        it("should append the suffix to items", () => {
          const { as } = append(suffix)(items);
          expect(as).to.deep.equal([...items.as, ...suffix.as]);
        });

        it("should leave suffix intact", () => {
          const previous_suffix = suffix;
          append(suffix)(items);
          expect(suffix).to.deep.equal(previous_suffix);
        });

        it("should leave items intact", () => {
          const previous_items = items;
          append(suffix)(items);
          expect(items).to.deep.equal(previous_items);
        });
      });
    });
  });
});
