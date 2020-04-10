export const checkKeyword = (
  keywords: string[],
  content: { title: string; }
): boolean => {
  return keywords.some(keyword => {
    if (content.title.toLowerCase().includes(keyword.toLowerCase())) {
      return true;
    }
  });
};
