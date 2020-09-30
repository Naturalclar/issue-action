import * as github from "@actions/github";
import { getRepo, getIssueNumber, getPrNumber } from "./github";

export const getIssueContent = async (token: string, titleOrBody: string) => {
  const octokit = new github.GitHub(token);

  let issue_number;

  if (getIssueNumber() !== undefined) {
    issue_number = getIssueNumber();
  } else if (getPrNumber() !== undefined) {
    issue_number = getPrNumber();
  } else {
    throw new Error("No Issue Provided");
  }

  const { data } = await octokit.issues.get({
    ...getRepo(),
    issue_number,
  });

  if (titleOrBody === "title") {
    return data.title;
  } else if (titleOrBody === "body") {
    return data.body;
  } else {
    return `${data.title} ${data.body}`;
  }
};
