import { Goal } from "simpleWorker/Goal";
import { TargetType, Score, TaskType } from "common/types";
import { PlanningPriority } from "goverment/base";

export function TaskTypeImportance(goal: Goal): Score {
    switch (goal.taskType) {
        case TaskType.Harvest:
            return PlanningPriority.harvest;
        case TaskType.Transfer:
            return PlanningPriority.transfer;
        case TaskType.UpgradeController:
            return PlanningPriority.upgradeController;
        case TaskType.Build:
            return PlanningPriority.build;
        case TaskType.Repair:
            return PlanningPriority.repair;
        case TaskType.Fortification:
            return PlanningPriority.fortification;
        default:
            return 1;
    }
}
