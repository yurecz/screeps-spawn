import { Goal } from "simpleWorker/Goal";
import { TargetType, Score } from "common/types";
import { TaskListManager } from "simpleWorker/Controller/TaskListManager";
const MaximumNumberOfWorkers = 5;
export function TargetOccupationByWorkers(goal: Goal):Score {
    const taskListManager = TaskListManager.instance();
    return taskListManager.getTaskListforTarget(goal.target).length <=MaximumNumberOfWorkers?1:0;
}
