import { observer } from "mobx-react-lite";
import React, { HtmlHTMLAttributes, SyntheticEvent, useState, useContext } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";



 


export default observer(function ActivityList() {

    const [target, setTarget] = useState('');

    const { activityStore } = useStore();

    const {deleteActivity,loading, activitiesByDate} = activityStore;

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {

        setTarget(e.currentTarget.name);
        deleteActivity(id);


    }


    return (


        <Segment>
            <Item.Group divided >
                {activitiesByDate.map((activity: Activity) => (

                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button
                                    name={activity.id}
                                    loading={loading && target === activity.id}
                                    floated="right"
                                    content="Delete"
                                    color="red"
                                    onClick={(e) => handleActivityDelete(e, activity.id)} />

                                <Button
                                    floated="right"
                                    content="View" color="blue"
                                    onClick={() => activityStore.selectActivity(activity.id)} />

                                <Label basic content={activity.category} color='teal' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )


})