import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";


interface Props {

    activities: Activity[],
    selectedActivity: Activity | undefined,
    selectActivity: (id: string) => void,
    deletetActivity: (id: string) => void,
}


export default function ActivityList({ activities, selectActivity, deletetActivity }: Props) {


    return (


        <Segment>
            <Item.Group divided >
                {activities.map((activity: Activity) => (

                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header>{ activity.title }</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                            <Button floated="right" content="Delete" color="red"
                                    onClick={() => deletetActivity(activity.id)} />
                                <Button floated="right" content="View" color="blue"
                                    onClick={() => selectActivity(activity.id)} />
                               
                                <Label basic content={activity.category} color='teal' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )


}