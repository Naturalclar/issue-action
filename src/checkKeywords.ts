export const checkKeywords = (
  parameters: { keywords: string[], labels: string[], assignees: string[] }[],
  content: string
): { keywords: string[], labels: string[], assignees: string[] }[] | null => {
  console.log('issue content:', content);

  let matchingKeywords: { keywords: string[], labels: string[], assignees: string[] }[] = [];

  parameters.forEach(obj => {
    return obj.keywords.forEach(keyword => {
      if (content.includes(keyword)) {
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
