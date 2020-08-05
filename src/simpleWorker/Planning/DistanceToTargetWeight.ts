import { Goal } from "simpleWorker/Goal";
import { Score, TaskType } from "common/types";
const decay = 0.5;
export function DistanceToTargetWeight(creep: Creep, goal: Goal): Score {
    const distance = creep.pos.getRangeTo(goal.target);
    if (goal.taskType === TaskType.Harvest || goal.taskType === TaskType.Transfer) {
        const threshold = 3;
        if (distance <= threshold) {
            return 1;
        } else {
            return Math.exp(decay * (threshold - distance));
        }
    }
    else {
        return 1;
    };
}
