import { getIssueContent } from "../src/getIssueContent";

test("throws error if no issue provided", async () => {
  const input = "foo";
  await expect(getIssueContent(input)).rejects.toThrow("Bad credentials");
});
