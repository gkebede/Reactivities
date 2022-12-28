import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import {v4 as uuid} from 'uuid'

//import NavBar from './NavBar';

import '../layout/styles.css';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import  {Activity}  from '../models/activity';
import NavBar from './NavBar';
 


function App() {




  const [activities, setActivities] = useState<Activity[]>([]);

  const [selectedActivity, setSelectedActivity] = useState<Activity |
                                                 undefined>(undefined);

  const [editMode,  setEditMode] = useState(false);                                                
 


  // useEffect  -> LOOP INDEFNATLY loop IF WE DON'T GIVE SOME KIND OF DEPENDENCY
  // 1   =========  activities   initialization
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/activities'
    )
      .then((response) => {   // console.log(response)
       
        setActivities(response.data);
      })
  }, []);


    // 2   =========  activity   initialization
    function handelSelectActivity (id: string)  {

      setSelectedActivity(activities.find(activity => activity.id === id))
    }

  // 3   =========  activity   canceling selected activity
    function handleCancelselectActivity ()  {
  
      setSelectedActivity(undefined);
    }

   const handelformOpen  = (id?: string) => {

    console.log('clickded')

  id ? handelSelectActivity(id) : handleCancelselectActivity();

  setEditMode(true);

  }


  function handelformClose() {

    setEditMode(false);
  
    }

    function handleCreateOrEditActivity(activity: Activity) {

       activity.id
        ? setActivities([...activities.filter( x=> x.id !== activity.id), activity])
        :setActivities([...activities, {...activity, id: uuid()}]);
        setEditMode(false);
        setSelectedActivity(activity);

    }

    function handleDeletetActivity(id: string) {

      
       setActivities([...activities.filter( x=> x.id !== id)])
       

   }




  return (
    <Fragment>

      <NavBar  openForm= {handelformOpen} />

      <Container style={{ marginTop: '7em' }}>

        <ActivityDashboard 
        activities={activities}
        selectedActivity={ selectedActivity }
        selectActivity ={ handelSelectActivity}
        cancelSelectActivity={handleCancelselectActivity}
        openForm ={ handelformOpen }
        closeForm = { handelformClose}
        createOrEdit ={handleCreateOrEditActivity}
        deletetActivity ={handleDeletetActivity}

        editMode = {editMode}
         />

      </Container>

    </Fragment>
  );
}

export default App;

// App -> ActivityDashboard -> ActivityList  -> ActivityDetails
