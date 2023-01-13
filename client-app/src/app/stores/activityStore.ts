import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from 'uuid';

export class ActivityStore {

    // activities: Activity[] = [];  === get activitiesByDate()
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;

    //defending mecanisms 
    editMode = false;
    loading = false;
    loadingInitial = false;



    constructor() {


        makeAutoObservable(this)
    }

    get activitiesByDate() {

        return Array.from(this.activityRegistry.values()).sort((a, b) => {

            return Date.parse(a.date) - Date.parse(b.date)

        })
    }

    get groupedActivites () {
// changning array in to object
        return Object.entries( 
            this.activitiesByDate.reduce( (activities, activity) => {

                const date = activity.date;

                activities[date] = activities[date] ? [...activities[date], activity]
                                                    : [activity]
                return activities;                                    

            }, {} as {[key: string] : Activity[]}) 
        )
    }

    // 1   =========  activities   initialization
    loadingActivites = async () => {

        this.setloadingInitial(true);

        try {
            const activities = await agent.Activities.list();

            runInAction(() => {
                activities.forEach((activity) => {
                    this.setActivity(activity);
                })
                this.setloadingInitial(false);
            })
        } catch (error) {

            console.log(error)
            this.setloadingInitial(false);
        }
    }

    loadActivity = async (id: string) => {

        let activity = this.getActivity(id);

        if (activity) {
            this.selectedActivity = activity;
        }
        else {
            this.setloadingInitial(true);

            try {
                activity = await agent.Activities.details(id);
            //    this.activityRegistry.set(activity.id, activity);
                this.setActivity(activity);

                this.selectedActivity = activity;
                this.setloadingInitial(false);

            } catch (error) {
                console.log(error);
                this.setloadingInitial(false);
            }
        }
    }


    private setActivity = (activity: Activity) => {

        activity.date = activity.date.split('T')[0]
        //  this.activities.push(activity);
       
        this.activityRegistry.set(activity.id, activity);
    }

    private getActivity = (id: string) => {

      

        return this.activityRegistry.get(id);
    }



    setloadingInitial = (state: boolean) => {

        this.loadingInitial = state;
    }

    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {

            await agent.Activities.create(activity);
            runInAction(() => {
                //this.activities.push(activity)
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })

        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    updateActivity = async (activity: Activity) => {

        this.loading = true;
        //activity.id  = uuid();

        try {

            await agent.Activities.update(activity);
            runInAction(() => {
                //this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })

        } catch (error) {

            console.log(error);
            runInAction(() => {

                this.loading = false;
            });

        }
    }

    deleteActivity = async (id: string) => {

        this.loading = true;

        try {

            await agent.Activities.delete(id);
            runInAction(() => {
                //this.activities = [...this.activities.filter(a => a.id !==  id)];
                this.activityRegistry.delete(id);
                this.loading = false;
            })

        } catch (error) {

            console.log(error);
            runInAction(() => {

                this.loading = false;
            });

        }


    }



}

