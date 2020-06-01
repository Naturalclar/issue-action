export const checkKeyword = (
  keywords: string[],
  content: string
): boolean => {
  return keywords.some(keyword => {
    if (content.toLowerCase().includes(keyword.toLowerCase())) {
      return content.toLowerCase().includes(keyword.toLowerCase());
    }
  });
};
