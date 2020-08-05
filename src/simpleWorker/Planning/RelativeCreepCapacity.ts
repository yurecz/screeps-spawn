import { Goal } from "simpleWorker/Goal";
import { TargetType, Score, TaskType } from "common/types";
export function RelativeCreepCapacity(creep: Creep, goal: Goal):Score {
    const relativeFreeCapacaity = creep.store.getFreeCapacity() / creep.store.getCapacity();
    //const relativeFreeCapacaity = creep.store.getFreeCapacity()?1:0;
    switch (goal.taskType) {
        case TaskType.Withdraw:
        case TaskType.Harvest:
            return relativeFreeCapacaity;
        default:
            return 1 - relativeFreeCapacaity;
    }
}
