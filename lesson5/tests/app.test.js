import { nameIsValid, fullTrim, getTotal } from "../src/app.js";

describe("nameIsValid", () => {
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

describe("fullTrim", () => {
  test("spaces incide", () => {
    expect(fullTrim("a r t j o m")).toBe("artjom");
  });

  test("spaces on borders", () => {
    expect(fullTrim("   hello   ")).toBe("hello");
  });

  test("empty string", () => {
    expect(fullTrim("")).toBe("");
  });
});

describe("getTotal", () => {
  test("without discount", () => {
    // Arrange
    const items = [{ price: 10, quantity: 2 }];
    // Act
    const result = getTotal(items);
    // Assert
    expect(result).toBe(20);
  });

  test("with discount", () => {
    expect(getTotal([{ price: 10, quantity: 10 }], 10)).toBe(90);
  });

  test("incorrect discount", () => {
    expect(() => getTotal([{ price: 10, quantity: 1 }], 200)).toThrow();
  });

  test.each([
    [[{ price: 10, quantity: 1 }], 0, 10],
    [[{ price: 10, quantity: 2 }], 50, 10],
    [[{ price: 5, quantity: 4 }], 25, 15],
  ])("returns %i as total for %j with discount %i", (items, discount, expected) => {
    expect(getTotal(items, discount)).toBe(expected);
  });
});
