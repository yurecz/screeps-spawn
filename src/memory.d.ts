
declare interface CreepMemory {
  logging: { active: boolean, flagID: string };
  taskDuration: any;
  role: import("screepRoles").ScreepRole;
  task: { taskType: import("./common/types").TaskType, targetID: string | undefined, duration: import("./common/types").Timer };
}
