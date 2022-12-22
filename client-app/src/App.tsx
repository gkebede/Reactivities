import { useEffect,useState } from 'react';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

 



function App() {

  

  const [activities, setActivities] = useState([]);


  // useEffect  -> LOOP INDEFNATLY loop IF WE DON'T GIVE SOME KIND OF DEPENDENCY

  useEffect(() => {

   

    axios.get('http://localhost:5000/activities'
  
    )
         .then(response  => {

          console.log(response)

          setActivities(response.data);

         })

  }, []);

  return (
    <div>
       <Header as='h2' icon='users' content='Reactivities' />

         <List>

         {activities.map((activity : any) => {

                return <List.Item key={activity.id}>{activity.title}</List.Item>

           })}

         </List>

    </div>
  );
}

export default App;
