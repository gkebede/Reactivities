import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid}  from 'uuid';
 

// if u want give identical name for a variable on a given page u 

// can give any randem name for the varible that we passing down as a Props

export default observer( function ActivityForm() {

    const {activityStore} = useStore();
    const {selectedActivity, createActivity, updateActivity, loading } = activityStore;
    const navigate = useNavigate();

    const initialState = selectedActivity ?? {

        "id": '',
        "title": '',
        "date": '',
        "description": '',
        "category": '',
        "city": '',
        "venue": ''
    }

    // b/c we want use activity on the page we call selectedActivity on the Props varible

    const [activity, setActivity]  = useState(initialState);

 

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {

        const {name, value} = event.target;

        setActivity({...activity, [name] : value})

        console.log(event);
    }

    function handelsubmit() {

        if(!activity.id){
            activity.id = uuid();
            createActivity(activity).then( () => {
                navigate(`/activities/${activity.id}`)
            });
        }else {
            updateActivity(activity).then( () => {
                navigate(`/activities/${activity.id}`)
            })
        }
    }



    return (

        <Segment clearing>
          
             {   activity && 
             
             <Form onSubmit={handelsubmit} autoComplete='off' >
                
                    <Form.Input placeholder={activity.title} 
                        value={activity.title} name='title'
                        onChange={handleInputChange} 
                        />

                    <Form.TextArea placeholder={activity.description} 
                     value={activity.description} name='description'
                     onChange={handleInputChange} 
                     />
                     
                    <Form.Input placeholder={activity.category} 
                    value={activity.category} name='category'
                    onChange={handleInputChange} 
                    />

                    <Form.Input placeholder={activity.date} 
                     value={activity.date} name='date' type='date'
                     onChange={handleInputChange} 
                     />

                    <Form.Input placeholder={activity.city} 
                     value={activity.city} name='city'
                     onChange={handleInputChange} 
                     />

                    <Form.Input placeholder={activity.venue} 
                     value={activity.venue} name='venue'
                     onChange={handleInputChange} 
                     />


                    <Button loading = { loading } content='Submit' type='submit' floated='right' positive/>
                    <Button floated='right' content='Cancel' type='button' as={Link} to= {'/activities'} />


                </Form>}

        </Segment>


    )



} )