import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from 'uuid';

export class ActivityStore {

   // activities: Activity[] = [];  === get activitiesByDate()
    activityRegistry = new Map<string, Activity> ();
    selectedActivity : Activity | undefined = undefined;

    //defending mecanisms 
    editMode = false;                                                
    loading  = false;  
    loadingInitial  = false;  
    


    constructor() {
        
        makeAutoObservable(this)
    }

    get activitiesByDate() {

        return Array.from(this.activityRegistry.values()).sort((a, b) => {

         return  Date.parse(a.date) - Date.parse(b.date)

        })
    }

      // 1   =========  activities   initialization
    loadingActivites = async () => {

        this.setloadingInitial(true);
        
        try {

            const activities = await agent.Activities.list();

            runInAction(() => {
                activities.forEach( (activity) => {

                    activity.date = activity.date.split('T')[0]

                  //  this.activities.push(activity);
    
                    this.activityRegistry.set(activity.id, activity);
                 })
    
              
    
                 this.setloadingInitial(false);
              })

         
            
        } catch (error) {

            console.log(error)
            this.setloadingInitial(false);
        }
    }

    // 2   =========  activity   initialization
    selectActivity = async (id: string) => {

           // this.selectedActivity = this.activities.find( a => a.id === id);
            this.activityRegistry.get(id);
            
            //    runInAction(() => this.loadingInitial  = false; 

            this.setloadingInitial(false);
         
    }

// 3   =========  activity   canceling selected activity
    cancelSelectActivity = () => {

        this.selectedActivity = undefined;
    }

    // THIS CODE DOESN'T WORK YET FOR navbar to open create open form
    openForm = (id?: string) => {

        id? this.selectActivity(id) : this.cancelSelectActivity();
     
        this.editMode = true;

    }




    closeForm =  () => {
        this.editMode = false;
    }


    setloadingInitial = (state: boolean) => {

        this.loadingInitial = state;
    }

    createActivity = async ( activity : Activity) => {

        this.loading = true;
        activity.id  = uuid();

        try {
            
            await agent.Activities.create(activity);
            runInAction( () => {
                //this.activities.push(activity)
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode =false;
                this.loading = false;
            })
           
        } catch (error) {

            console.log(error);
            runInAction( () => {

                this.loading = false;
            });
            
        }
    }

    updateActivity = async ( activity : Activity) => {

        this.loading = true;
        //activity.id  = uuid();

        try {
            
            await agent.Activities.update(activity);
            runInAction( () => {
               //this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
               this.activityRegistry.set(activity.id, activity);
               this.selectedActivity = activity;
                this.editMode =false;
                this.loading = false;
            })
           
        } catch (error) {

            console.log(error);
            runInAction( () => {

                this.loading = false;
            });
            
        }
    }

    deleteActivity = async (id: string) => {

        this.loading = true;

        try {
            
            await agent.Activities.delete(id);
            runInAction( () => {
               //this.activities = [...this.activities.filter(a => a.id !==  id)];
               this.activityRegistry.delete(id);
            if (this.selectedActivity?.id === id) this.cancelSelectActivity();
                this.loading = false;
            })
           
        } catch (error) {

            console.log(error);
            runInAction( () => {

                this.loading = false;
            });
            
        }


    }


  
}

