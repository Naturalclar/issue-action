import { checkKeyword } from "../src/checkKeyword";

describe("checkKeyword", () => {
  it("returns true if keyword is included in the issue content", () => {
    const result = checkKeyword(["test"], "test");
    expect(result).toBe(true);
  });
  it("returns true for different casings in keyword", () => {
    const result = checkKeyword(["test", "Bar"], "bar");
    expect(result).toBe(true);
  });
  it("returns true for different casings in content", () => {
    const result = checkKeyword(["test", "bar"], "Bar");
    expect(result).toBe(true);
  });

  it("returns false if keyword is not included in title or body", () => {
    const result = checkKeyword(["test"], "");
    expect(result).toBe(false);
  });
});
