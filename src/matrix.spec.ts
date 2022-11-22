import { expect } from "chai";
import {
  column,
  row,
  scale,
  add,
  transpose,
  zeros,
  multiply,
  identity,
} from "./matrix";
import { vec } from "./vector";

describe("matrix", () => {
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

  describe("multiply", () => {
    describe("given a matrix n x p", () => {
      const b = vec(vec(0, 1000), vec(1, 100), vec(0, 10));

      describe("given another matrix m x n", () => {
        const a = vec(vec(2, 3, 4), vec(1, 0, 0));

        it("should return the product matrix", () => {
          expect(multiply(b)(a)).to.deep.equal([
            [3, 2340],
            [0, 1000],
          ]);
        });

        it("should return a matrix with m rows", () => {
          expect(multiply(b)(a).length).to.deep.equal(a.length);
        });

        it("should return a matrix with p columns", () => {
          expect(multiply(b)(a)[0].length).to.deep.equal(b[0].length);
        });
      });
    });
  });

  describe("identity", () => {
    describe("given a scalar value", () => {
      const n = 2;

      it("should return a square matrix", () => {
        const m = identity(n);
        expect(m.length).to.equal(m[0].length);
      });

      it("should return a matrix with n rows", () => {
        expect(identity(n).length).to.equal(n);
      });

      it("should return a matrix wih only 0s and 1s", () => {
        expect(identity(n).every((r) => r.every((x) => x === 0 || x === 1))).to
          .be.true;
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
});
