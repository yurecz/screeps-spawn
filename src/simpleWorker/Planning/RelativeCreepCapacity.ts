import { Goal } from "simpleWorker/Goal";
import { TargetType, Score, TaskType } from "common/types";
export function RelativeCreepCapacity(creep: Creep, goal: Goal): Score {
    //const relativeFreeCapacaity = creep.store.getFreeCapacity()?1:0;
    switch (goal.taskType) {
        case TaskType.Withdraw:
        case TaskType.Harvest:
        case TaskType.PickUp:
            const relativeFreeCapacity = creep.store.getFreeCapacity() / creep.store.getCapacity();
            return relativeFreeCapacity;
        default:
            const relativeCapacity = creep.store.getUsedCapacity(RESOURCE_ENERGY) / creep.store.getCapacity();
            return relativeCapacity;
    }
}
