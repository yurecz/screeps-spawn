import { Target } from "../Goal";
import { TargetType, TaskType } from "common/types";

export type Task = { taskType: TaskType, creep: Creep, target?: Target };
export type TaskList = Task[];

export class TaskListManager {

    private static taskListManager:TaskListManager;
    private taskList: TaskList = [];

    private constructor(){ };

    public static instance(){
        if(!this.taskListManager){
            this.taskListManager = new TaskListManager();
        }
        return this.taskListManager;
    }

    public addTask(task:Task) {
        this.taskList.push(task);
    }

    public clearList() {
        this.taskList = [];
    }

    public getTaskListforTarget(target: Target): TaskList {
        const groupedTasksByTarget = _.countBy(this.taskList, a => a.target?.id );
        const filteredTaskList =  _.filter(this.taskList,a =>a.target === target);
        return filteredTaskList;
    }

}
