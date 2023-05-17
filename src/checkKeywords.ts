import { Parameter } from './types'

export const checkKeywords = (
  parameters: Parameter[],
  content: string
): Parameter[] | null => {
  console.log('issue content:', content);

  let matchingKeywords: Parameter[] = [];

  parameters.forEach(obj => {
    return obj.keywords.forEach(keyword => {
      if (RegExp(`(?!-)\\b${keyword.toLowerCase()}\\b(?!-)`, 'g').test(content.toLowerCase())) {
        matchingKeywords.push(obj);
      }
    })
  })

  if (matchingKeywords.length !== 0) {
    return matchingKeywords;
  } else {
    return null;
  }
};
