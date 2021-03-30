export const countKeywords = (
  parameters: { area: string, keywords: string[], labels: string[], assignees: string[] }[],
  content: string
): string => {

  let issueWords: string[] = content.split(" ");
  let areaMap = new Map();
  let usedKeywords: string[] = [];
  const DEVALUE: number = .75;
  let newValue: number;

  // Count keywords in each area by looking at each word in content and counting it to an area if it is a keyword of that area
  issueWords.forEach(word => {
    parameters.forEach(obj => {
      obj.keywords.forEach(keyword => {
        // TODO adjust (word === keyword) to be less picky (similar word library, regex, toLower, keyword in word)
        if(word === keyword && usedKeywords.includes(keyword)) {
          if(areaMap.has(obj.area)) {
            console.log(areaMap[obj.area])
            console.log(typeof(areaMap[obj.area]))
            newValue = areaMap.get(obj.area)+.75
            areaMap.set(obj.area, newValue);
          } else {
              areaMap.set(obj.area, 1);
            }
        } else if(word === keyword) {
          usedKeywords.push(word)
          if(areaMap.has(obj.area)) {
            console.log(areaMap[obj.area])
            console.log(typeof(areaMap[obj.area]))
            let newValue = areaMap.get(obj.area)+1
            areaMap.set(obj.area, newValue);
          } else {
            areaMap.set(obj.area, 1);
          }
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