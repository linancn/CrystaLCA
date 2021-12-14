export type PlanInfo = {
  pkid: number;
  id: string;
  projectId: number;
  name: string;
  creator: string;
  createTime: Date;
  lastUpdateTime: Date;
  comment: string;
  type: string;
  nation: string;
  version: string;
};

export type PlanModel = {
  // pkid: number;
  projectId: number;
  id: string;
  parentCount: number;
  name: string;
  childrenJson: string;
};

export type PlanModelState = {
  isSelected: boolean;
  cellType: string;
  cellID: string;
  cellConfig: any;
};
