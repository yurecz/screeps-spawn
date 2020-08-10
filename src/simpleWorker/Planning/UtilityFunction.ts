import { Goal } from "simpleWorker/Goal";
import { Score } from "common/types";
import { RelativeCreepCapacity } from "./RelativeCreepCapacity";
import { TaskTypeImportance } from "./TaskTypeImportance";
import { DistanceToTargetWeight } from "./DistanceToTargetWeight";
import { TargetRelativeCapacity } from "./TargetRelativeCapacity";
import { TargetOccupationByWorkers } from "./TargetOccupationByWorkers";
import { Logger } from "utils/Logger";
import { FortificationPriority } from "./FortificationPriority";

export class UtilityFunction {

    public score(creep: Creep, goal: Goal): Score {


        FortificationPriority(goal);

        const taskTypeImportance = TaskTypeImportance(goal);
        const relativeCreepCapacity = RelativeCreepCapacity(creep, goal);
        const distanceToTargetWeight = DistanceToTargetWeight(creep, goal);
        const targetRelativeCapacity = TargetRelativeCapacity(goal);
        const targetOccupationByWorkers = TargetOccupationByWorkers(goal);
        const fortificationPriority = FortificationPriority(goal);
        const score = taskTypeImportance
            * relativeCreepCapacity
            * distanceToTargetWeight
            * targetRelativeCapacity
            * targetOccupationByWorkers
            * fortificationPriority
            ;
        Logger.log(creep, "Score for target: " + goal.target.id
            + "\n Task: " + goal.taskType
            + "\n Score: " + score.toFixed(3)
            + "\n TaskTypeImportance: " + taskTypeImportance.toFixed(3)
            + "\n RelativeCreepCapacity: " + relativeCreepCapacity.toFixed(3)
            + "\n DistanceToTargetWeight: " + distanceToTargetWeight.toFixed(3)
            + "\n TargetRelativeCapacity: " + targetRelativeCapacity.toFixed(3)
            + "\n TargetOccupationByWorkers: " + targetOccupationByWorkers.toFixed(3)

        )

        return score;
    }

}




