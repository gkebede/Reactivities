import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import NavBar from '../../../app/layout/NavBar';
import { Activity } from '../../../app/models/activity';

export interface Props {

    activity: Activity | undefined,
    closeForm: () => void,
    createOrEdit: (activity: Activity) => void
  
}

// if u want give identical name for a variable on a given page u 

// can give any randem name for the varible that we passing down as a Props

export default function ActivityForm({ activity : selectedActivity, closeForm, createOrEdit  }: Props) {

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

        console.log(activity);

        createOrEdit(activity);
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
                     value={activity.date} name='date'
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


                    <Button content='Submit' type='submit' floated='right' positive/>
                    <Button floated='right' content='Cancel' type='button' onClick={closeForm} />


                </Form>}
         

        </Segment>


    )



}