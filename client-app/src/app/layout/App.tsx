import { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';


import '../layout/styles.css';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import NavBar from './NavBar';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';





function App() {

  const { activityStore } = useStore()



  // useEffect  -> LOOP INDEFNATLY loop IF WE DON'T GIVE SOME KIND OF DEPENDENCY

  useEffect(() => {
    activityStore.loadingActivites();

  }, [activityStore]);


  // THIS IS LINE IS NOT WORKING



  if (activityStore.loadingInitial) {

    return <LoadingComponent content='Loading app' />
  }



  return (



    <Fragment>



      <NavBar />

      <Container style={{ marginTop: '7em' }}>



        <ActivityDashboard /> 
          
      </Container>

    </Fragment>
  );
}



export default observer(App);

// App -> ActivityDashboard -> ActivityList  -> ActivityDetails
