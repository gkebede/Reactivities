import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { Button, Card, Grid, Image } from "semantic-ui-react";
import { updateQualifiedName } from "typescript";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";



export default observer(function ActivityDetails() {



  const { activityStore } = useStore();
  const [ids , setIds] = useState( '');
  const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
  const {id} = useParams();

  useEffect( ()=> {

    setIds(id!);
     
     if(id) loadActivity(id);

    
    
  }, [id, loadActivity]);

  if (!activity ) return < LoadingComponent content={"Loading..."} />;
  

  return (

<Grid >
  <Grid.Column width={10} >
    <ActivityDetailedHeader activity={activity} />
    <ActivityDetailedInfo activity={activity} />
    <ActivityDetailedChat />
  </Grid.Column>
  <Grid.Column width={6}  >
    <ActivityDetailedSidebar />
  </Grid.Column>
</Grid>

  )

})