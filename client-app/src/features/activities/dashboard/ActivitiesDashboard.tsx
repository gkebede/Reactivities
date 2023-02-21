import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";

import { observer } from 'mobx-react-lite';
import ActivityFilters from "./ActivityFilters";
import ActivityForm from "../form/ActivityForm";





export default observer( function ActivityDashboard() {

    const {activityStore} = useStore();
    const { loadActivities, activityRegistry} = activityStore;


    useEffect( () => {
        loadActivities()
      }, [loadActivities])
    
    
  
    // THE following LINE IS NOT WORKING
  
  
    if (activityStore.selectedActivity) {
  
      return <LoadingComponent content='Loading app' />
    }
  
  


    return (

        
        <Grid>
            <Grid.Column width='10'>
             <ActivityList  /> 
            </Grid.Column>

            <Grid.Column width='6'>
             
                <ActivityFilters />

            </Grid.Column>


        </Grid>


    )

})