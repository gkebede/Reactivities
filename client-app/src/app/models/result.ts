import { Activity } from "./activity";

 export interface Result{
    isSuccess:boolean,
    error:string,
    value: Activity[]
}