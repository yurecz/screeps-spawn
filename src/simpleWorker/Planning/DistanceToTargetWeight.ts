import { Goal } from "simpleWorker/Goal";
import { Score, TaskType } from "common/types";
export function DistanceToTargetWeight(creep: Creep, goal: Goal): Score {
    const distance = creep.pos.getRangeTo(goal.target);
    if (goal.taskType === TaskType.Harvest || goal.taskType === TaskType.Transfer || goal.taskType === TaskType.PickUp ) {
        return curve(1,0.5);
    }
    else {
        return curve(3,0.5);
    };

    function curve(threshold: number, decay:number): number {
        if (distance <= threshold) {
            return 1;
        } else {
            return Math.exp(decay * (threshold - distance));
        }
    }
}
