import { Score, TargetType, TaskType } from "common/types";

export type Target = AnyStructure| Source | ConstructionSite|Tombstone|Ruin;
export type Goal = { taskType: TaskType, target: Target };
export type WeightedGoal = { goal: Goal, score: Score };

