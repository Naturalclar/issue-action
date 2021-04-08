export type LabelOptions = {
  addLabels?: string[],
  removeLabels?: string[]
};

export type Parameter = {
  keywords: string[],
  labels: string[] | LabelOptions,
  assignees: string[]
};