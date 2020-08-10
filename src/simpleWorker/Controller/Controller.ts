import { Task, TaskListManager } from "./TaskListManager";
import { TargetType, TaskType } from "common/types";
import { Logger } from "utils/Logger";

export class Controller {

    public assignTask(task: Task): Boolean {

        const creep = task.creep;
        const target = task.target;

        switch (task.taskType) {
            case TaskType.Harvest:
                const source = target as Source;
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    this.moveTo(creep, task, source);
                }
                break;
            case TaskType.Transfer:
                const structure = target as Structure;
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(creep, task, structure);
                }
                break;
            case TaskType.UpgradeController:
                const controller = target as StructureController;
                if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                    this.moveTo(creep, task, controller);
                }
                break;
            case TaskType.Build:
                const constructionSite = target as ConstructionSite;
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    this.moveTo(creep, task, constructionSite);
                }
                break;
            case TaskType.Repair:
            case TaskType.Fortification:
                const repairSite = target as Structure;
                Logger.log(creep, "try to repair!" + repairSite.structureType);
                if (creep.repair(repairSite) == ERR_NOT_IN_RANGE) {
                    this.moveTo(creep, task, repairSite);
                }
                break;
            case TaskType.Withdraw:
                const withdrawSite = target as Structure | Tombstone | Ruin;
                Logger.log(creep, "try to withdraw Energy from!" + withdrawSite.id);
                if (creep.withdraw(withdrawSite, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.moveTo(creep, task, withdrawSite);
                }
                break;
            case TaskType.PickUp:
                const drop = target as Resource;
                Logger.log(creep, "try to pickup resource!" + drop.id);
                if (creep.pickup(drop) == ERR_NOT_IN_RANGE) {
                    this.moveTo(creep, task, drop);
                }
                break;
            default:
                break;
        }

        if (!creep.memory.task) {
            creep.memory.task = { taskType: task.taskType, targetID: undefined, duration: 0 };
        }

        if (creep.memory.task.targetID !== task.target?.id) {
            const targetID = target ? target.id : undefined;
            creep.memory.task = { taskType: task.taskType, targetID: targetID, duration: 1 };
        } else {
            creep.memory.task.duration++;
            creep.memory.task.taskType = task.taskType;
        }

        return true;
    }

    private moveTo(creep: Creep, task: Task, roomPosition: RoomObject) {
        if (creep.memory.logging.active) {
            creep.moveTo(roomPosition, { visualizePathStyle: { opacity: 1, stroke: '#ffaa00' } });
        }
        else {
            creep.moveTo(roomPosition);
        }
        Logger.log(creep, "move to " + task.taskType);

    }
}
