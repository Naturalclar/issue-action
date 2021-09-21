import * as core from "@actions/core";
import { IParameter, Issue } from './issue';
import { GithubApi } from './github';

async function run() {
  core.setOutput("labeled", false.toString());
  core.setOutput("assigned", false.toString());

  const token = core.getInput('github-token');
  const github: GithubApi = new GithubApi(token);
  const content: string[] = await github.getIssueContent();
  const issue: Issue = new Issue(content);
  const winningAreaData: IParameter = issue.getWinningAreaData(issue.determineArea())

  if (winningAreaData.area === '') { 
    console.log("Keywords not included in this issue");
  } else {
    github.setIssueAssignees(winningAreaData.assignees);
    github.setIssueLabels(winningAreaData.labels);
    core.setOutput("labeled", true.toString());
    core.setOutput("assigned", true.toString());
  }
}

run().catch((error) => {
  core.setFailed(error.message);
});
