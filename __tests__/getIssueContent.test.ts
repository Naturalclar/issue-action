import { getIssueContent } from "../src/getIssueContent";

test("throws error if no issue provided", async () => {
  const input = "foo";
  const titleOrBody = "both";
  await expect(getIssueContent(input, titleOrBody)).rejects.toThrow("No Issue Provided");
});
