export type Timer = number;
export type Score = number;

export enum TargetType{
    NotAssigned = "Not assigned",
    Spawn = "Spawn",
    Extension = "Extension",
    EnergySource = "Energy source",
    RoomController = "Room controller",
    ConstructionSite = "Construction site"
}

export enum TaskType{
    Idle = "Nothing to do",
    Transfer = "Energy transfer",
    Store = "Store",
    Harvest = "Harvest",
    UpgradeController = "Upgrade controller",
    Build = "Build",
    Repair = "Repair",
    Fortification = "Fortification",
    Withdraw = "Withdraw",
    PickUp = "Pick-up",
}
