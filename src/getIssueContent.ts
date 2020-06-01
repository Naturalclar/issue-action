import * as github from "@actions/github";
import { getRepo, getIssueNumber } from "./github";

export const getIssueContent = async (token: string, titleOrBody) => {
  const octokit = new github.GitHub(token);

  const issue_number = getIssueNumber();

  if (issue_number == null) {
    throw new Error("No Issue Provided");
  }

  const { data } = await octokit.issues.get({
    ...getRepo(),
    issue_number
  });

  if (titleOrBody === 'title') {
    return data.title;
  } else if (titleOrBody === 'body') {
    return data.body;
  } else {
    return `${data.title} ${data.body}`
  }
  
};
