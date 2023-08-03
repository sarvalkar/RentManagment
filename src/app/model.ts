export interface Flat{
    flatName?: number;
    buildingName?:Building;
    id?:number;
    

}

export interface Building{
    buldingNmae:string;
    floorNumber:number;
    id:number

}

export interface Floor{
    floorNumber:number;
    buildingName:string;
    id:number;
}