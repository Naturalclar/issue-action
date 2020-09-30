import { checkKeywords } from "../src/checkKeywords";

describe("checkKeywords", () => {
  it("returns an array of matching keyword objects if keyword is included in the issue content", () => {
    const result = checkKeywords(
      [{ keywords: ["test"], labels: ["test"], assignees: ["Naturalclar"] }],
      "test"
    );
    expect(result).toEqual([
      { keywords: ["test"], labels: ["test"], assignees: ["Naturalclar"] },
    ]);
  });
  it("returns an array of matching keyword objects even if different casings in keyword", () => {
    const result = checkKeywords(
      [
        {
          keywords: ["test", "Bar"],
          labels: ["test"],
          assignees: ["Naturalclar"],
        },
      ],
      "bar"
    );
    expect(result).toEqual([
      {
        keywords: ["test", "Bar"],
        labels: ["test"],
        assignees: ["Naturalclar"],
      },
    ]);
  });
  it("returns an array of matching keyword objects even if different casings in issue content", () => {
    const result = checkKeywords(
      [
        {
          keywords: ["test", "bar"],
          labels: ["test"],
          assignees: ["Naturalclar"],
        },
      ],
      "Bar"
    );
    expect(result).toEqual([
      {
        keywords: ["test", "bar"],
        labels: ["test"],
        assignees: ["Naturalclar"],
      },
    ]);
  });

  it("returns null if keyword is not included in issue content", () => {
    const result = checkKeywords(
      [{ keywords: ["test"], labels: ["test"], assignees: ["Naturalclar"] }],
      ""
    );
    expect(result).toBeNull();
  });
  it("returns null if keyword is surrounded by character", () => {
    const result = checkKeywords(
      [{ keywords: ["test"], labels: ["test"], assignees: ["Naturalclar"] }],
      "testable"
    );
    expect(result).toBeNull();
  });
  it("matches if keyword is surrounded by 2 byte space", () => {
    const result = checkKeywords(
      [{ keywords: ["test"], labels: ["test"], assignees: ["Naturalclar"] }],
      "　test　" // 2byte space for Japanese or Chinese characters
    );
    expect(result).toEqual([
      {
        keywords: ["test"],
        labels: ["test"],
        assignees: ["Naturalclar"],
      },
    ]);
  });
});
