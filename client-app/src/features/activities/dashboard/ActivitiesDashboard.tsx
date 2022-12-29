import React from "react";
import { Grid, List, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

export interface Props {

    activities: Activity[],
    selectedActivity: Activity | undefined,
    selectActivity: (id: string) => void,
    cancelSelectActivity: () => void,

    editMode: boolean
    openForm: (id?: string) => void,
    closeForm: () => void,

    createOrEdit: (activity: Activity) => void,
    deletetActivity: (id: string) => void,

    submitting : boolean
     

}



export default function ActivityDashboard({
    activities, selectedActivity, selectActivity, cancelSelectActivity,
    editMode, openForm, closeForm, createOrEdit, deletetActivity, submitting
}: Props) {

    return (


        <Grid>
            <Grid.Column width='10'>
                <ActivityList
                
                    selectActivity={selectActivity}
                    activities={activities}
                    selectedActivity={selectedActivity}
                    deletetActivity = { deletetActivity }
                    submitting = {submitting}


                />
            </Grid.Column>


            <Grid.Column width='6'>
                {
                    activities.map((activity: Activity) => (

                        activity && selectedActivity &&  // if activity & selectedActivity is exist or not null
                        <Segment key={activity.id} >
                            {
                                  !editMode &&

                                <ActivityDetails

                                    activity={selectedActivity}

                                    cancelSelectActivity={cancelSelectActivity}
                                    openForm={openForm}

                                />
                            }

                            {
                                
                                editMode &&
                                <ActivityForm 
                                closeForm={closeForm} createOrEdit = {createOrEdit}
                                              activity={activity }  submitting = {submitting}

                                              />

                            }

                        </Segment>

                    ))}

            </Grid.Column>


        </Grid>


    )

}