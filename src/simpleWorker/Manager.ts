import { Planner } from "./Planning/Planner";
import { Controller } from "./Controller/Controller";
import { TaskListManager } from "./Controller/TaskListManager";

export class Manager{

    private planner: Planner;
    private controller: Controller;
    private taskListManager:TaskListManager;

    public constructor(){
        this.taskListManager = TaskListManager.instance();
        this.taskListManager.clearList();
        this.planner = new Planner();
        this.controller = new Controller();
    }
    public run(creep:Creep){
        const plannedTask = this.planner.planTask(creep);
        if (this.controller.assignTask(plannedTask)){
            this.taskListManager.addTask(plannedTask);
        }

    }

}
