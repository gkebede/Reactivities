import { observer } from 'mobx-react-lite';
import { Fragment, useEffect } from 'react';
import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from '../../../app/stores/store';
import ActivityListItem from './ActivityListItem';

export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { groupedActivities, loadActivities, activitiesByDate } = activityStore;


    return (
        <>
            {groupedActivities.map(([group, activities]) => (

                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                
                        {
                            activities.map(activity => (

                                <ActivityListItem key={activity.id} activity={activity} />

                            ))
                            
                            }

                </Fragment>

            ))}
        </>

    )
})


// https://github.com/TryCatchLearn/Reactivities/blob/main/client-app/src/features/activities/dashboard/ActivityList.tsx