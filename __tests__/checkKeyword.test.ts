import { checkKeyword } from "../src/checkKeyword";

describe("checkKeyword", () => {
  it("returns true if keyword is included in the title", () => {
    const result = checkKeyword(["test"], { title: "test" });
    expect(result).toBe(true);
  });
  it("returns true for different casings in keyword", () => {
    const result = checkKeyword(["test", "Bar"], { title: "bar" });
    expect(result).toBe(true);
  });
  it("returns true for different casings in content", () => {
    const result = checkKeyword(["test", "bar"], { title: "Bar" });
    expect(result).toBe(true);
  });

  it("returns false if keyword is not included in title", () => {
    const result = checkKeyword(["test"], { title: "" });
    expect(result).toBe(false);
  });
});
