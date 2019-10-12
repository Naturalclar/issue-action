import { getComment } from "../src/getComment";

test("throws invalid number", async () => {
  const input = "foo";
  await expect(getComment(input)).rejects.toThrow("Bad credentials");
});
