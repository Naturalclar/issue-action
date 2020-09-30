import { getIssueContent } from "../src/getIssueContent";

test("throws error if no issue provided", async () => {
  const token = process.env.GITHUB_TOKEN || "foo";
  const titleOrBody = "both";
  await expect(getIssueContent(token, titleOrBody)).rejects.toThrow(
    "No Issue Provided"
  );
});
