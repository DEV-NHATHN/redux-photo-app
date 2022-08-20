import React from 'react';
import PropTypes from 'prop-types';
import Label from 'reactstrap/lib/Label';
import Select from 'react-select';
import FormGroup from 'reactstrap/lib/FormGroup';
import { ErrorMessage } from 'formik';
import FormFeedback from 'reactstrap/lib/FormFeedback';


SelectField.propTypes = {
   // Fast Field truyền vào
   field: PropTypes.object.isRequired,
   form: PropTypes.object.isRequired,
   // Tự định nghĩa
   label: PropTypes.string,
   placeholder: PropTypes.string,
   disabled: PropTypes.bool,
   options: PropTypes.array
};

SelectField.defaultProps = {
   // Tự định nghĩa
   label: '',
   placeholder: '',
   disabled: false,
   options: [],
};

function SelectField(props) {
   const { field, form,
      options, label, placeholder, disabled
   } = props;

   const { name, value } = field

   const { errors, touched } = form
   const showError = errors[name] && touched[name]

   //  Map lại dữ liệu của Option
   const selectedOptionValue = options.find(option => option.value === value)

   const handleSelectedOptionChange = (selectedOption) => {
      // chọn rồi thì lấy ra option value
      const selectedValue = selectedOption ? selectedOption.value : selectedOption

      const changeEvent = {
         target: {
            name: name,
            value: selectedValue
         }
      }
      field.onChange(changeEvent)
   }

   return (
      <FormGroup>
         {label && <Label for={name}>{label}</Label>}
         <Select
            id={name}
            {...field}
            // Overwrite onChange + Value
            onChange={handleSelectedOptionChange}
            value={selectedOptionValue}
            // -------------------------------- 
            placeholder={placeholder}
            isDisabled={disabled}
            options={options}

            className={showError ? 'is-invalid' : ''}
         />

         <ErrorMessage name={name} component={FormFeedback} />
      </FormGroup>
   )
}



export default SelectField;
