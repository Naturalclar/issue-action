export const checkKeyword = (
  keywords: string[],
  content: { title: string; body: string }
): boolean => {
  return keywords.some(keyword => {
    if (content.title.includes(keyword)) {
      return true;
    }
    return content.body.includes(keyword);
  });
};
