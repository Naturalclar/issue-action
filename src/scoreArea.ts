import { similarStrings } from './similarStrings'

export const scoreArea = (
    content: string,
    parameters: { area: string, keywords: string[], labels: string[], assignees: string[] }[],
    returnObject: { potentialAreasMap: Map<string, number>, detectedKeywords: string[]},
    devalue
): { potentialAreasMap: Map<string, number>, detectedKeywords: string[]} => {
  
  // Count keywords in each area by looking at each word in content and counting it to an area if it is a keyword of that area
  parameters.forEach(obj => {
    obj.keywords.forEach(keyword => {
      // TODO adjust (word === keyword) to be less picky (similar word library, regex, toLower)
      if(similarStrings(content, keyword)) {
        returnObject.detectedKeywords.push(content)
        returnObject.potentialAreasMap.has(obj.area) ?
          returnObject.potentialAreasMap.set(obj.area, returnObject.potentialAreasMap.get(obj.area)+devalue) :
          returnObject.potentialAreasMap.set(obj.area, devalue);
        return returnObject
      }    
    })
  })

  return returnObject;
}