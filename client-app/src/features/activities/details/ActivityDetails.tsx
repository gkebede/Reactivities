import React from "react";
import { Button, Card, Grid, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

 

export default function ActivityDetails() {


    
  const {activityStore} = useStore();

  const {selectedActivity: activity, openForm, cancelSelectActivity} = activityStore;

  if(!activity) return < LoadingComponent content={""} />;

  return (

    <Card fluid>
      <Image src={`assets/categoryImages/${activity.category}.jpg`} />
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

          <Button content='Edit' floated="right" color="green" 
          onClick={() => openForm(activity.id)}
          />
          <Button
            color="red" content='Cancel' floated="right"
            onClick={cancelSelectActivity}
          />

        </Button.Group>
      </Card.Content>
    </Card>

  )

}