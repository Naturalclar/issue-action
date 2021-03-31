import { scoreArea } from './scoreArea'

export const countKeywords = (
  parameters: { area: string, keywords: string[], labels: string[], assignees: string[] }[],
  content: string
): string => {

  let potentialAreas: Map<string, number> = new Map();
  let issueWords = content.split(/ |\./);
  console.log({issueWords})
  let devalue: number = 1, devalueCounter: number = 1;

  // Count keywords in each area by looking at each word in content and counting it to an area if it is a keyword of that area
  issueWords.forEach(content => {
    potentialAreas = scoreArea(content, parameters, potentialAreas, devalue);
    devalue = 1/++devalueCounter;
  })

  // Determine which area has the most matches
  let winningArea = '';
  let max = 0;
  for (let area of potentialAreas.entries()) {
    console.log(area)
    if (area[1] > max) {
      winningArea = area[0]
      max = area[1]
    }
  }

  return winningArea;
}