import { ErrorMapper } from "utils/ErrorMapper";
import { ScreepRole } from "screepRoles";
import { Manager } from "simpleWorker/Manager";
import { Logger } from "utils/Logger";
import { USE_PROFILER } from './settings';

import profiler from "screeps-profiler";

onGlobalReset();

let _loop:() => void;
if (USE_PROFILER){
  _loop = ErrorMapper.wrapLoop(() => profiler.wrap(main));
} else {
  _loop = ErrorMapper.wrapLoop(() => main());
}

export const loop = _loop;

function onGlobalReset(): void {
  if (USE_PROFILER) profiler.enable();

}

function main(): void {

  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    } else {
      //     Game.creeps[name].memory = {taskDuration:0, role: ScreepRole.SimpleWorker, logging:{active:false, flagID:""}, task:{taskType:TaskType.Idle,duration:0,targetID:""}};

      if (!Game.creeps[name].memory.role) {
        Game.creeps[name].memory.role = ScreepRole.SimpleWorker;
        Game.creeps[name].memory.logging = { active: false, flagID: "" };
      }
    }
  }

  if (Object.keys(Game.creeps).length < 10) {
    const body = [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
    //const body = [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
    //const body = [WORK,WORK, CARRY, CARRY, MOVE, MOVE];
    //const body = [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];

    var newName = 'Creep' + Game.time;
    if (Game.spawns['Spawn1'].spawnCreep(body, newName) === ERR_NOT_ENOUGH_ENERGY) {
      const cost = body.reduce(function (cost, part) {
        return cost + BODYPART_COST[part];
      }, 0);
      //     console.log("Not enough energy, need: "+ cost);
    } else {
      //     console.log('Spawning the creep: ' + newName);
    };

  }

  const manager = new Manager();

  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName];
    Logger.log(creep, "Creep: " + creepName);
    manager.run(Game.creeps[creepName]);
  }

  for (const roomName in Game.rooms) {
    const room = Game.rooms[roomName];
    const towers = room.find<StructureTower>(FIND_MY_STRUCTURES, { filter: a => a.structureType === STRUCTURE_TOWER });
    for (const tower of towers) {
      const enemy = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if (enemy) {
        tower.attack(enemy);
      }
    }
  }


}
