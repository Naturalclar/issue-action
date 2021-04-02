import { scoreArea } from './scoreArea'

export const countKeywords = (
  parameters: { area: string, keywords: string[], labels: string[], assignees: string[] }[],
  titleContent: string,
  bodyContent: string
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
    returnObject = scoreArea(content, parameters, returnObject, titleValue);
    titleValue = (2/(1+x))
  })

  bodyIssueWords.forEach(content => {
    returnObject = scoreArea(content, parameters, returnObject, bodyValue);
  })

  // Determine which area has the most matches
  let winningArea = '';
  let max = 0;
  for (let area of returnObject.potentialAreasMap.entries()) {
    console.log(area)
    if (area[1] > max) {
      winningArea = area[0]
      max = area[1]
    }
  }

  return winningArea;
}