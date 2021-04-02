import levenshtein from 'js-levenshtein';

export const similarStrings = (str1: string, str2: string, similarity: number = 0): boolean => {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    str1 = str1.replace(/ |_|-|\(|\)|:|\[|\]|	|\./gi, '');
    str2 = str2.replace(/ |_|-|\(|\)|:|\[|\]|	|\./gi, '');
  ​
    if(levenshtein(str1, str2) <= (str1.length + str2.length / 2) * similarity)
      return true;
    else
      return false;
}