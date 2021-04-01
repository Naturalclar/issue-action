import { scoreArea } from './scoreArea'

export const countKeywords = (
  parameters: { area: string, keywords: string[], labels: string[], assignees: string[] }[],
  content: string
): string => {

  let issueWords = content.split(/ |\./);
  let devalue: number = 1, devalueCounter: number = 1;
  let returnObject: { potentialAreasMap: Map<string, number>, detectedKeywords: string[]} = { potentialAreasMap: new Map(), detectedKeywords: []}

  // Count keywords in each area by looking at each word in content and counting it to an area if it is a keyword of that area
  issueWords.forEach(content => {
    returnObject = scoreArea(content, parameters, returnObject.potentialAreasMap, devalue, returnObject.potentialAreasMap);
    devalue = 1/++devalueCounter;
  })

  console.log(returnObject.detectedKeywords);

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