import { scoreArea } from './scoreArea'

export const countKeywords = (
  parameters: { area: string, keywords: string[], labels: string[], assignees: string[] }[],
  titleContent: string,
  bodyContent: string,
  similar: number
): string => {

  let titleIssueWords = titleContent.split(/ |\./);
  let bodyIssueWords = bodyContent.split(/ |\./)
  let titleValue: number = 1
  let x: number = 1;
  let bodyValue: number = .1
  let detectedKeywords: string[] = [];
  let potentialAreas: Map<string, number> = new Map()
  let returnObject: { potentialAreasMap: Map<string, number>, detectedKeywords: string[]} = {potentialAreasMap: potentialAreas, detectedKeywords: detectedKeywords}

  // Count keywords in each area by looking at each word in content and counting it to an area if it is a keyword of that area
  titleIssueWords.forEach(content => {
    returnObject = scoreArea(content, parameters, returnObject, titleValue, similar);
    titleValue = (2/(1+x))
  })

  bodyIssueWords.forEach(content => {
    returnObject = scoreArea(content, parameters, returnObject, bodyValue, similar);
  })

  // Determine which area has the most matches
  let winningArea = '';
  let winners: Map<string,number> = new Map();
  for (let area of returnObject.potentialAreasMap.entries()) {
    if(winners.size === 0) {
      winners.set(area[0], area[1]);
    } else if (area[1] > winners.entries().next().value) {
      winners = new Map();
      winners.set(area[0], area[1]);
    } else if (area[1] === winners.entries().next().value) {
      winners.set(area[0], area[1]);
    }
  }

  if(winners.size > 1 && similar !== 0) {
    winningArea = countKeywords(parameters, titleContent, bodyContent, 0);
  } else {
    //winningArea = winners.entries().next(;
  }

  return winningArea;
}