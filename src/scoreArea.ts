import { similarStrings } from './similarStrings'

export const scoreArea = (
    content: string,
    parameters: { area: string, keywords: string[], labels: string[], assignees: string[] }[],
    potentialAreas,
    devalue,
    detectedKeywords
): { potentialAreasMap: Map<string, number>, detectedKeywords: string[]} => {
  
  // Count keywords in each area by looking at each word in content and counting it to an area if it is a keyword of that area
  parameters.forEach(obj => {
    obj.keywords.forEach(keyword => {
      // TODO adjust (word === keyword) to be less picky (similar word library, regex, toLower)
      if(similarStrings(content, keyword)) {
        detectedKeywords.push(content)
        potentialAreas.has(obj.area) ?
          potentialAreas.set(obj.area, potentialAreas.get(obj.area)+devalue) :
          potentialAreas.set(obj.area, devalue);
        return { potentialAreas, detectedKeywords };
      }    
    })
  })

  return potentialAreas;
}