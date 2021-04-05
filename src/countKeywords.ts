import { scoreArea } from './scoreArea'

export const countKeywords = (
  parameters: { area: string, keywords: string[], labels: string[], assignees: string[] }[],
  titleContent: string,
  bodyContent: string,
  similarity: number
): string => {

  let titleIssueWords = titleContent.split(/ |\./);
  let bodyIssueWords = bodyContent.split(/ |\./)
  let titleValue: number = 1
  let x: number = 1;
  let bodyValue: number = .05
  let potentialAreas: Map<string, number> = new Map()

  // For each word in the title, check if it matches any keywords. If it does, add decreasing score based on inverse function to the area keyword is in.
  titleIssueWords.forEach(content => {
    potentialAreas = scoreArea(content, parameters, potentialAreas, titleValue, similarity);
    titleValue = (2/(1+x))
    x++
  })

  // Add static value to area keyword is in if keyword is found in body
  bodyIssueWords.forEach(content => {
    potentialAreas = scoreArea(content, parameters, potentialAreas, bodyValue, similarity);
  })

  console.log(...potentialAreas)

  // Determine which area has the most matches
  let winningArea = '';
  let winners: Map<string,number> = new Map();
  for (let area of potentialAreas.entries()) {
    if(winners.size === 0) {
      winners.set(area[0], area[1]);
    } else if (area[1] > winners.values().next().value) {
      winners = new Map();
      winners.set(area[0], area[1]);
    } else if (area[1] === winners.values().next().value) {
      winners.set(area[0], area[1]);
    }
  }
  // tiebreaker goes to the area with more *exact* keyword matches
  if(winners.size > 1 && similarity !== 0) {
    winningArea = countKeywords(parameters, titleContent, bodyContent, 0);
  } else if (winners.size > 0) {
    winningArea = winners.keys().next().value;
  } 

  winningArea = winners.keys().next().value;

  return winningArea;
}
