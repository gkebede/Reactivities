import React from 'react';
import { useField} from 'formik';
import { Form, Label, Select } from 'semantic-ui-react';
import { boolean } from 'yup';


interface Props {
    placeholder: string;
    name: string;
    options: any;
    label? : string;
}

export default  function MySelectInput (props: Props) {

    const [ field, meta, helpers] = useField(props.name)

    return(
         
       // !!meta.touched === it a boolean
        
        <Form.Field  error={meta.error && !!meta.touched}>

            <label>{props.label}</label>
           <Select 
           clearable
           options={props.options}
           value={field.value || null}
           onChange = {(e, d) => helpers.setValue(d.value) }
           onBlur = {(e, d) => helpers.setTouched(true) }
           placeholder={props.placeholder}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}

        </Form.Field>
      

        )

}