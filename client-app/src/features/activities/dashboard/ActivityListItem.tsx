import { Link, NavLink } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity
}

export default function ActivityListItem({ activity }: Props) {
  
    return (

        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header to={`/activities/${activity.id}}`} as={ Link }>{activity.title}
                            </Item.Header>
                            <Item.Description>
                     Hosted by bob
                </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon  name='clock' /> {activity.date}
                    <Icon name ='marker'/>{activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendece go hetre
            </Segment>
            <Segment clearing >
                <span>{activity.description}</span>

                <Button
                        floated="right"
                        content="View" color="teal"
                        as={Link} to={`/activities/${activity.id}`} />
            </Segment>
        </Segment.Group>
    )
}