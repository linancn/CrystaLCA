export type Parameter = {
  pkid: number;
  id?: string;
  projectId: number;
  processId: string;
  name: string;
  lastUpdateTime?: Date;
  comment: string;
  formula?: string;
  value?: number;
  min?: number;
  max?: number;
  sd?: string;
};
