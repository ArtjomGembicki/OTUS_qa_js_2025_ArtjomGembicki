import { test, expect } from "@playwright/test";
import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

test.describe("nameIsValid", () => {
  test("Valid Name", () => {
    const input = "artjom";
    const result = nameIsValid(input);
    expect(result).toBe(true);
  });

  test("Short Name", () => {
    expect(nameIsValid("a")).toBe(false);
  });

  test("Invalid name with numbers", () => {
    expect(nameIsValid("artjom112233")).toBe(false);
  });
});

test.describe("fullTrim", () => {
  test("spaces inside", () => {
    expect(fullTrim("a r t j o m")).toBe("artjom");
  });

  test("spaces on borders", () => {
    expect(fullTrim("   hello   ")).toBe("hello");
  });

  test("empty string", () => {
    expect(fullTrim("")).toBe("");
  });
});

test.describe("getTotal", () => {
  test("without discount", () => {
    const items = [{ price: 10, quantity: 2 }];
    const result = getTotal(items);
    expect(result).toBe(20);
  });

  test("with discount", () => {
    expect(getTotal([{ price: 10, quantity: 10 }], 10)).toBe(90);
  });

  test("incorrect discount", () => {
    expect(() => getTotal([{ price: 10, quantity: 1 }], 200)).toThrow();
  });

  test.describe("table tests", () => {
    const cases = [
      { items: [{ price: 10, quantity: 1 }], discount: 0, expected: 10 },
      { items: [{ price: 10, quantity: 2 }], discount: 50, expected: 10 },
      { items: [{ price: 5, quantity: 4 }], discount: 25, expected: 15 },
    ];

    for (const { items, discount, expected } of cases) {
      test(`returns ${expected} for items=${JSON.stringify(items)} with discount=${discount}`, () => {
        expect(getTotal(items, discount)).toBe(expected);
      });
    }
  });
});