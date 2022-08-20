import React from 'react';
import PropTypes from 'prop-types';
import Label from 'reactstrap/lib/Label';
import Input from 'reactstrap/lib/Input';
import FormGroup from 'reactstrap/lib/FormGroup';
import FormFeedback from 'reactstrap/lib/FormFeedback';
import { ErrorMessage } from 'formik';


InputField.propTypes = {
   // Fast Field truyền vào
   field: PropTypes.object.isRequired,
   form: PropTypes.object.isRequired,
   // Tự định nghĩa
   type: PropTypes.string,
   label: PropTypes.string,
   placeholder: PropTypes.string,
   disabled: PropTypes.bool,
};

InputField.defaultProps = {
   // Tự định nghĩa
   type: 'text',
   label: '',
   placeholder: '',
   disabled: false,
};

function InputField(props) {
   const { field, form,
      type, label, placeholder, disabled
   } = props;

   const { name } = field
   // Validate input
   const { errors, touched } = form
   const showError = errors[name] && touched[name]

   return (
      <FormGroup>
         {label && <Label for={name}>{label}</Label>}
         <Input
            id={name}
            {...field}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            // Invalid for FormFeedBack
            invalid={showError}
         />
         {/* 
         {showError && <FormFeedback>{errors[name]}</FormFeedback>} 
         is the same as ErrorMessage
         */}
         <ErrorMessage name={name} component={FormFeedback} />
      </FormGroup>
   )
}

export default InputField;
