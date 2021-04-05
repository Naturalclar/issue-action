import { similarStrings } from './similarStrings'

export const scoreArea = (
    content: string,
    parameters: { area: string, keywords: string[], labels: string[], assignees: string[] }[],
    potentialAreas: Map<string, number>,
    reducedValue,
    similarity: number
): Map<string, number> => {
  
  // If content and keyword are 'similar', update area score if already exists, else set area and initial score
  parameters.forEach(obj => {
    obj.keywords.forEach(keyword => {
      if(similarStrings(content, keyword, similarity)) {
        potentialAreas.has(obj.area) ?
          potentialAreas.set(obj.area, potentialAreas.get(obj.area)+reducedValue) :
          potentialAreas.set(obj.area, reducedValue);
      }    
    })
  })

  return potentialAreas;
}
