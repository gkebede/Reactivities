import React from "react";
import { Grid, List, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

import { observer } from 'mobx-react-lite';





export default observer( function ActivityDashboard() {

   // const activity =  activities[0];

    const {activityStore} = useStore()

    return (

        
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>


            <Grid.Column width='6'>
                {
                   
                    //activities.map((activity: Activity) => (

                        activityStore.selectedActivity &&  // if activity & selectedActivity is exist or not null
                        <Segment  >
                            {
                                activityStore.selectedActivity &&  !activityStore.editMode &&
                                <ActivityDetails />
                            }

                            {
                                activityStore.editMode &&
                                <ActivityForm />
                            }

                        </Segment>

                   // )
                   // )
                }

            </Grid.Column>


        </Grid>


    )

})