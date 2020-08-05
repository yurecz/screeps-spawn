import { Goal, WeightedGoal } from "../Goal";
import { TargetType, Score, TaskType } from "common/types";
import { UtilityFunction } from "./UtilityFunction";
import { Task } from "simpleWorker/Controller/TaskListManager";

export class Planner {

    private goals: Goal[] = [];
    private utilityFunction: UtilityFunction;

    public constructor() {

        this.utilityFunction = new UtilityFunction();

        for (const roomName in Game.rooms) {
            const room = Game.rooms[roomName];

            const spawns = room.find(FIND_MY_SPAWNS, {
                filter: (structure) => {
                    return (structure.energy !== structure.energyCapacity)
                }
            });
            for (const spawn of spawns) {
                this.goals.push({ taskType: TaskType.Transfer, target: spawn });
            }

            const extensions = room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION && structure.energy !== structure.energyCapacity)
                }
            });
            for (const extension of extensions) {
                this.goals.push({ taskType: TaskType.Transfer, target: extension });
            }

            const towers = room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_TOWER && structure.energy !== structure.energyCapacity)
                }
            });
            for (const tower of towers) {
                this.goals.push({ taskType: TaskType.Transfer, target: tower });
            }

            const energySources = room.find(FIND_SOURCES)
            for (const energySource of energySources) {
                this.goals.push({ taskType: TaskType.Harvest, target: energySource });
            }

            const ruins = room.find(FIND_RUINS, {
                filter: (ruins) => {
                    return (ruins.store.getUsedCapacity()> 0)
                }
            });
            for (const ruin of ruins) {
                this.goals.push({ taskType: TaskType.Withdraw, target: ruin });
            }

            const tombstones = room.find(FIND_TOMBSTONES, {
                filter: (tombstone) => {
                    return (tombstone.store.getUsedCapacity()> 0)
                }
            });
            for (const tombstone of tombstones) {
                this.goals.push({ taskType: TaskType.Withdraw, target: tombstone });
            }

            const controller = room.controller;
            if (controller) {
                this.goals.push({ taskType: TaskType.UpgradeController, target: controller });
            }

            const constructionSites = room.find(FIND_CONSTRUCTION_SITES);
            for (const constructionSite of constructionSites) {
                this.goals.push({ taskType: TaskType.Build, target: constructionSite });
            }

            const repairSites = room.find(FIND_STRUCTURES, {
                filter: object => object.hits / object.hitsMax < 0.1 && object.structureType !== STRUCTURE_WALL && object.structureType !== STRUCTURE_RAMPART
            });
            for (const repairSite of repairSites) {
                this.goals.push({ taskType: TaskType.Repair, target: repairSite });
            }

            const fortificationSites = room.find(FIND_STRUCTURES, {
                filter: object => object.hits < 1000 && ( object.structureType == STRUCTURE_WALL || object.structureType == STRUCTURE_RAMPART )
            });
            for (const fortificationSite of fortificationSites) {
                this.goals.push({ taskType: TaskType.Fortification, target: fortificationSite });
            }
        }

    }

    public planTask(creep: Creep): Task {

        if (this.goals.length > 0) {
            let weightedGoals: WeightedGoal[] = [];

            for (const goal of this.goals) {
                let score = this.getGoalScore(goal, creep);
                weightedGoals.push({ goal: goal, score: score });
            }

            weightedGoals = _.sortByOrder(weightedGoals, ['score'], ['desc']);

            const weightedGoal = weightedGoals[0];
            return { creep: creep, taskType: weightedGoal.goal.taskType, target: weightedGoal.goal.target };
        }
        return { creep: creep, taskType: TaskType.Idle };
    }

    private getGoalScore(goal: Goal, creep: Creep): Score {
        const score = this.utilityFunction.score(creep, goal);
        //console.log("Target:" + goal.target.id + " Score:" + score);
        return score;
    }

}
