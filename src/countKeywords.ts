export const countKeywords = (
  parameters: { area: string, keywords: string[], labels: string[], assignees: string[] }[],
  content: string
): string => {

  let issueWords: string[] = content.split(" ");
  let areaMap = new Map();
  let usedKeywords: string[] = [];
  const DEVALUE: number = .75;

  // Count keywords in each area by looking at each word in content and counting it to an area if it is a keyword of that area
  issueWords.forEach(word => {
    parameters.forEach(obj => {
      obj.keywords.forEach(keyword => {
        // TODO adjust (word === keyword) to be less picky (similar word library, regex, toLower, keyword in word)
        if(word === keyword && usedKeywords.includes(keyword)) {
          areaMap.has(obj.area) ? areaMap.set(obj.area, areaMap[obj.area]+DEVALUE) : areaMap.set(obj.area, 1);
        } else if(word === keyword) {
          areaMap.has(obj.area) ? areaMap.set(obj.area, areaMap[obj.area]++) : areaMap.set(obj.area, 1);
          usedKeywords.push(word);
        }
      })
    })
  })

  console.log(usedKeywords)

  // Determine which area has the most matches
  let winningArea = '';
  let max = 0;
  for (let area of areaMap.entries()) {
    console.log(area)
    if (area[1] > max) {
      winningArea = area[0];
      max = area[1];
    }
  }

  return winningArea;
}