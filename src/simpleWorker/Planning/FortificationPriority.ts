import { Goal } from "simpleWorker/Goal";
import { Score, TaskType } from "common/types";
export function FortificationPriority(goal: Goal): Score {
    if (goal.taskType == TaskType.Fortification) {
        return 1;
    }
    else
        return 1;
}
