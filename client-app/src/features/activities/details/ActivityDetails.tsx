import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";



export default observer(function ActivityDetails() {



  const { activityStore } = useStore();
  const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
  const {id} = useParams();

  useEffect( ()=> {
     
     if(id) loadActivity(id);
    
  }, [id, loadActivity]);

  if (!activity) return < LoadingComponent content={"Loading..."} />;
  

  return (

    <Card fluid>
     
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span className='date'>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>

        <Button.Group>

          <Button content='Edit' floated="right"  as= { Link } to={`/createActivity/`} color="green" />

          <Button
            color="red" content='Cancel' floated="left" />


        </Button.Group>
      </Card.Content>
    </Card>

  )

})