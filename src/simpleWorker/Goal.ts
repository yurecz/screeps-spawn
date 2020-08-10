import { Score, TargetType, TaskType } from "common/types";

export type Target = AnyStructure| Source | ConstructionSite|Tombstone|Ruin|Resource;
export type Goal = { taskType: TaskType, target: Target };
export type Goals = [Goal];
export type WeightedGoal = { goal: Goal, score: Score };

