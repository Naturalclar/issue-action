import levenshtein from 'js-levenshtein';

export const similarStrings = (str1: string, str2: string, similarity: number = 0): boolean => {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    
    // Regex for removing punctuation and replacing with empty string
    str1 = str1.replace(/ |_|-|\(|\)|:|\[|\]|	|\./gi, '');
    str2 = str2.replace(/ |_|-|\(|\)|:|\[|\]|	|\./gi, '');
  
    // levenshtein returns a value between 0 and the length of the strings being compared. This
    // represents the number of character differences between compared strings. We compare this
    // with a set percentage of the average length of said strings
    if(levenshtein(str1, str2) <= Math.ceil(((str1.length + str2.length) / 2) * similarity))
      return true;
    else
      return false;
}
