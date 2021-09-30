import * as core from "@actions/core";
import levenshtein from 'js-levenshtein';

export interface IParameter {
  area: string;
  keywords: string[];
  labels: string[];
  assignees: string[];
}

export class Issue {
  private titleIssueWords?: string[];
  private bodyIssueWords?: string[];
  public parameters: IParameter[];
  private similarity: number;
  private bodyValue: number;

  constructor(content: string[]) {
    const excluded: string[] = core.getInput("excluded-expressions", {required: false}).replace(/\[|\]/gi, '').split('|');
    const title = content[0];
    const body = content[1];
    if (title) {
      excluded.forEach(ex => {
        title.replace(ex, '');
      });
      this.titleIssueWords = title.split(/ |\(|\)|\./);
    }
    if (body) {
      excluded.forEach(ex => {
        body.replace(ex, '');
      });
      this.bodyIssueWords = body.split(/ |\(|\)|\./);
    }
    this.parameters = JSON.parse(core.getInput("parameters", {required: true}));
    this.similarity = +core.getInput("similarity", {required: false});
    this.bodyValue = +core.getInput("body-value", {required: false});
  }

  public determineArea(): string {
    let titleValue: number = 1;
    let x: number = 1;
    let potentialAreas: Map<string, number> = new Map();

    const weightedTitle: (n: number) => number = (n: number) => {
      return (2/(1+n));
    }
      
    // For each word in the title, check if it matches any keywords. If it does, add decreasing score based on inverse function to the area keyword is in.
    if(this.titleIssueWords) {
      this.titleIssueWords.forEach(content => {
        potentialAreas = this.scoreArea(content, potentialAreas, titleValue);
        ++x;
        titleValue = weightedTitle(x);
      });
    }
      
    // Add static value to area keyword is in if keyword is found in body
    if(this.bodyIssueWords) {
      this.bodyIssueWords.forEach(content => {
        potentialAreas = this.scoreArea(content, potentialAreas, this.bodyValue);
      });
    }
      
    console.log("Area scores: ", ...potentialAreas);

    let winningArea = '';
    let winners: Map<string,number> = new Map();
    for (let area of potentialAreas.entries()) {
      if(winners.size === 0) {
        winners.set(area[0], area[1]);
      } else if (area[1] > winners.values().next().value) {
        winners = new Map();
        winners.set(area[0], area[1]);
      } else if (area[1] === winners.values().next().value) {
        winners.set(area[0], area[1]);
      }
    }
    // tiebreaker goes to the area with more *exact* keyword matches
    if(winners.size > 1 && this.similarity !== 0) {
      this.similarity = 0;
      winningArea = this.determineArea();
    } else if (winners.size > 0) {
      winningArea = winners.keys().next().value;
    } 
      
    winningArea = winners.keys().next().value;

    console.log("Winning area: " + winningArea);
      
    return winningArea;
  }

  public getWinningAreaData(winningArea: string): IParameter {
    let winningAreaData: IParameter = {
      area: '',
      keywords: [],
      labels: [],
      assignees: [],
    }

    for(let obj of this.parameters) {
      if(winningArea === obj.area) {
        winningAreaData = obj;
      }
    }

    return winningAreaData;
  }

  private scoreArea(content: string, potentialAreas: Map<string, number>, value): Map<string, number> {
    this.parameters.forEach(obj => {
      obj.keywords.forEach(keyword => {
        if(this.similarStrings(content, keyword)) {
          potentialAreas.has(obj.area) ?
            potentialAreas.set(obj.area, potentialAreas.get(obj.area)+value) :
            potentialAreas.set(obj.area, value);
        }    
      })
    })    
    return potentialAreas;
  }

  private isSimilar(str1: string, str2: string): number {
    return (((str1.length + str2.length) / 2) * this.similarity);
  }

  private similarStrings(str1: string, str2: string): boolean {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
        
    // Regex for removing punctuation and replacing with empty string
    str1 = str1.replace(/ |_|-|\(|\)|:|\[|\]|	|\./gi, '');
    str2 = str2.replace(/ |_|-|\(|\)|:|\[|\]|	|\./gi, '');
      
    // levenshtein returns a value between 0 and the length of the strings being compared. This
    // represents the number of character differences between compared strings. We compare this
    // with a set percentage of the average length of said strings
    if(levenshtein(str1, str2) <= this.isSimilar(str1, str2))
      return true;
    else
      return false;
  }
}
