import { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import {v4 as uuid} from 'uuid'

//import NavBar from './NavBar';

import '../layout/styles.css';
import ActivityDashboard from '../../features/activities/dashboard/ActivitiesDashboard';
import  {Activity}  from '../models/activity';
import NavBar from './NavBar';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
 


function App() {




  const [activities, setActivities] = useState<Activity[]>([]);

  const [selectedActivity, setSelectedActivity] = useState<Activity |
                                                 undefined>(undefined);

  const [editMode,  setEditMode] = useState(false);                                                
  const [loading,  setLoading] = useState(false);                                                
  const [submitting,  setSubmitting] = useState(false);                                                
 


  // useEffect  -> LOOP INDEFNATLY loop IF WE DON'T GIVE SOME KIND OF DEPENDENCY
  // 1   =========  activities   initialization
  useEffect(() => {
    agent.Activities.list().then((response) => {   // console.log(response)
       
        setActivities(response);
          setLoading(false)
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




    function handelformOpen(id?: string)  {

    //console.log('clickded')

  id ? handelSelectActivity(id) : handleCancelselectActivity();

  setEditMode(true);

  }




  function handelformClose() {

    setEditMode(false);
  
    }



    function handleCreateOrEditActivity(activity: Activity) {

      setSubmitting(true);

      if(activity.id){

        agent.Activities.update( activity).then( () => {
          setActivities([...activities.filter( x=> x.id !== activity.id), activity])
          setSelectedActivity(activity);
          setEditMode(false);
          setSubmitting(false);
        } )

      }else{

        activity.id = uuid();
        agent.Activities.create(activity).then( () => {

          setActivities([...activities, activity]);
          setSelectedActivity(activity);
          setEditMode(false);
          setSubmitting(false);

        })

      }

    }




    function handleDeletetActivity(id: string) {

      setSubmitting(true);

      agent.Activities.delete(id).then( () => {

        setActivities([...activities.filter( x=> x.id !== id)])


      });

      setSubmitting(false);
      
   }

// THIS IS LINE IS NOT WORKING


  if(loading)   {

  setLoading(true)
 return <LoadingComponent content='Loading app' />
}

 


  return (
    
    <Fragment>



      <NavBar  openForm= {handelformOpen} /> 

      <Container style={{ marginTop: '7em' }}>

        <ActivityDashboard 
        submitting ={submitting}
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
