import { expect } from "chai";
import { column, row, sum, transpose, zeros } from "./matrix";
import { vec } from "./vector";

describe("matrix", () => {
  describe("row", () => {
    describe("given items", () => {
      const items = [1, 2, 3];

      it("should return a row vector", () => {
        expect(row(...items)).to.deep.equal([items]);
      });
    });
  });

  describe("column", () => {
    describe("given items", () => {
      const items = [1, 2, 3];

      it("should return a column vector", () => {
        expect(column(...items)).to.deep.equal([[1], [2], [3]]);
      });
    });
  });

  describe("zeros", () => {
    describe("given a row count", () => {
      const m = 3;

      describe("given a column count", () => {
        const n = 2;

        it("should return a matrix with given number of rows", () => {
          expect(zeros(m)(n).length).to.equal(m);
        });

        it("should return a matrix with given number of columns", () => {
          expect(zeros(m)(n).every((r) => r.length === n)).to.be.true;
        });

        it("should have all zeros", () => {
          expect(zeros(m)(n).every((r) => r.every((x) => x === 0))).to.be.true;
        });
      });
    });
  });

  describe("transpose", () => {
    describe("given a matrix", () => {
      const m = vec(vec(1, 2, 3), vec(4, 5, 6));

      it("should return the rows as columns", () => {
        expect(transpose(m)).to.deep.equal(
          vec(vec(1, 4), vec(2, 5), vec(3, 6))
        );
      });

      it("should return its input when applied twice", () => {
        expect(transpose(transpose(m))).to.deep.equal(m);
      });
    });
  });

  describe("sum", () => {
    describe("given a matrix", () => {
      const a = vec(vec(1, 2, 3), vec(4, 5, 6));

      describe("given another matrix with the same dimensions", () => {
        const b = vec(vec(1, 2, 3), vec(4, 5, 6));

        it("should return the element-wise sum", () => {
          expect(sum(b)(a)).to.deep.equal(vec(vec(2, 4, 6), vec(8, 10, 12)));
        });
      });
    });
  });
});
