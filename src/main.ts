import { ErrorMapper } from "utils/ErrorMapper";
import { ScreepRole } from "screepRoles";
import { Manager } from "simpleWorker/Manager";
import { Logger } from "utils/Logger";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    } else {
      if (!Game.creeps[name].memory.role) {
        Game.creeps[name].memory.role = ScreepRole.SimpleWorker;
      }
    }
  }

  if (Object.keys(Game.creeps).length < 10) {

    const body = [WORK, WORK, WORK, WORK,CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
    //const body = [WORK, WORK,WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
    //const body = [WORK, WORK, CARRY, CARRY, MOVE, MOVE];

    var newName = 'Creep' + Game.time;
    if(Game.spawns['Spawn1'].spawnCreep(body, newName) === ERR_NOT_ENOUGH_ENERGY ){
      const cost = body.reduce(function (cost, part) {
        return cost + BODYPART_COST[part];
    }, 0);
      console.log("Not enough energy, need: "+ cost);
    } else {
      console.log('Spawning the creep: ' + newName);
    }
    ;
  }

  const manager = new Manager();

  for (const creepName in Game.creeps) {
    const creep = Game.creeps[creepName];
    Logger.log(creep, "Creep: " + creepName);
    manager.run(Game.creeps[creepName]);
  }
});
