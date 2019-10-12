import * as github from "@actions/github";
import { getRepo, getIssueNumber } from "./github";

export const getComment = async (token: string) => {
  const octokit = new github.GitHub(token);

  const issue_number = getIssueNumber();

  if (issue_number != null) {
    const { data } = await octokit.issues.get({
      ...getRepo(),
      issue_number
    });
    console.log(data);
    const { title, body } = data;

    console.log(title);
    console.log(body);
    return { title, body };
  }
  return null;
};
