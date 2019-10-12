import { checkKeyword } from "../src/checkKeyword";

describe("checkKeyword", () => {
  it("returns true if keyword is included in the title", () => {
    const result = checkKeyword(["test"], { title: "test", body: "" });
    expect(result).toBe(true);
  });
  it("returns true if keyword is included in the body", () => {
    const result = checkKeyword(["test"], { title: "", body: "test" });
    expect(result).toBe(true);
  });
  it("returns true if second keyword is included in title or body", () => {
    const result = checkKeyword(["test", "bar"], { title: "bar", body: "" });
    expect(result).toBe(true);
  });

  it("returns false if keyword is not included in title or body", () => {
    const result = checkKeyword(["test"], { title: "", body: "" });
    expect(result).toBe(false);
  });
});
