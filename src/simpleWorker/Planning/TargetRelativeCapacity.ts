import { Goal } from "simpleWorker/Goal";
import { TargetType, Score, TaskType } from "common/types";
import { Logger } from "utils/Logger";
export function TargetRelativeCapacity(goal: Goal): Score {
    switch (goal.taskType) {
        case TaskType.Harvest:
            const source = goal.target as Source;
            return source.energy / source.energyCapacity;
        default:
            return 1;
    }
}
