import * as github from "@actions/github";
import { getRepo, getIssueNumber } from "./github";

export const getIssueContent = async (token: string) => {
  const octokit = new github.GitHub(token);
  console.log('token', token)
  const issue_number = getIssueNumber();

  if (issue_number == null) {
    console.log('issue_number?', issue_number)
    throw new Error("No Issue Provided");
  }

  const { data } = await octokit.issues.get({
    ...getRepo(),
    issue_number
  });
  const { title } = data;
  return { title };
};
