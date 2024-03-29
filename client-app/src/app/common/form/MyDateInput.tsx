import React from 'react';
import { useField} from 'formik';
import { Form, Label, Select } from 'semantic-ui-react';

import DatePicker, {ReactDatePickerProps} from 'react-datepicker';




export default  function MyDateInput (props: Partial<ReactDatePickerProps>) {

    const [ field, meta, helpers] = useField(props.name!)

    return(
       // !!meta.touched === it a boolean
        
        <Form.Field  error={meta.error && !!meta.touched}>
            <DatePicker 
            {...field} 
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange = {value => helpers.setValue(value)}
            />
          
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}

        </Form.Field>
      

        )

}