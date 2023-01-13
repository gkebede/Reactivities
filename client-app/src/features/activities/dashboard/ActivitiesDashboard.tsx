import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";

import { observer } from 'mobx-react-lite';
import ActivityFilters from "./ActivityFilters";





export default observer( function ActivityDashboard() {


  

    const {activityStore} = useStore();
    const { loadingActivites, activityRegistry} = activityStore;
    // useEffect  -> LOOP INDEFNATLY loop IF WE DON'T GIVE SOME KIND OF DEPENDENCY
  
    useEffect(() => {

        if(activityRegistry.size === 0) loadingActivites();
       
  
    }, [loadingActivites]);
  
  
    // THIS IS LINE IS NOT WORKING
  
  
  
    if (activityStore.loadingInitial) {
  
      return <LoadingComponent content='Loading app' />
    }
  
  


    return (

        
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>

            <Grid.Column width='6'>
             
                <ActivityFilters />

            </Grid.Column>


        </Grid>


    )

})