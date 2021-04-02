import levenshtein from 'js-levenshtein';

export const similarStrings = (str1: string, str2: string, similarity: number = 0): boolean => {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    
    // Regex for removing punctuation and replacing with empty string
    str1 = str1.replace(/ |_|-|\(|\)|:|\[|\]|	|\./gi, '');
    str2 = str2.replace(/ |_|-|\(|\)|:|\[|\]|	|\./gi, '');
  ​
    // levenshtein returns a value between 0 and 1 based on how similar the strings are. Higher = more similar
    // based on number of changes required to get from one string to the other
    if(levenshtein(str1, str2) <= ((str1.length + str2.length) / 2) * similarity)
      return true;
    else
      return false;
}