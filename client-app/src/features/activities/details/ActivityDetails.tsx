import React from "react";
import { Button, Card, Grid, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

export interface Props {

  activity: Activity,
  cancelSelectActivity: () => void,
  openForm: (id: string) => void,


}

export default function ActivityDetails({ activity,
  cancelSelectActivity, openForm}: Props) {

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