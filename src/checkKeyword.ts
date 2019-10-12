export const checkKeyword = (
  keywords: string[],
  content: { title: string; body: string }
): boolean => {
  return keywords.some(keyword => {
    if (content.title.toLowerCase().includes(keyword.toLowerCase())) {
      return true;
    }
    return content.body.toLowerCase().includes(keyword.toLowerCase());
  });
};
