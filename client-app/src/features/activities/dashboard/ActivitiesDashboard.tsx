import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";

import { observer } from 'mobx-react-lite';
import ActivityFilters from "./ActivityFilters";
import ActivityForm from "../form/ActivityForm";





export default observer( function ActivityDashboard() {

    const {activityStore, userStore:{getUser, user}} = useStore();
    const { loadActivities, activityRegistry} = activityStore;


    useEffect( () => {
        // if(!user){
        //     return
        // }else{
            loadActivities()
       // }
        
      }, [loadActivities,getUser])
    
    
  
    // THE following LINE IS NOT WORKING
  
  
    if (activityStore.selectedActivity) {
  
      return <LoadingComponent content='Loading activities...' />
    }
  
  


    return (

        
        <Grid>
            <Grid.Column width='10'>
             <ActivityList  /> 
            </Grid.Column>

            <Grid.Column width='6'>
             
                { user &&<ActivityFilters />}

            </Grid.Column>


        </Grid>


    )

})