import React from 'react';
import PropTypes from 'prop-types';
import Label from 'reactstrap/lib/Label';
import FormGroup from 'reactstrap/lib/FormGroup';
import RandomPhoto from '../../components/RandomPhoto/index.jsx';
import { ErrorMessage } from 'formik';
import { FormFeedback } from 'reactstrap';


RandomPhotoField.propTypes = {
   // Fast Field truyền vào
   field: PropTypes.object.isRequired,
   form: PropTypes.object.isRequired,
   // Tự định nghĩa
   label: PropTypes.string,
};

RandomPhotoField.defaultProps = {
   // Tự định nghĩa
   label: '',
};

function RandomPhotoField(props) {
   const { field, form,
      label
   } = props;

   const { name, value, onBlur } = field

   const { errors, touched } = form
   const showError = errors[name] && touched[name]

   const handleImageUrlChange = (newImageUrl) => {
      form.setFieldValue(name, newImageUrl)
   }

   // Click button => handleImageUrlChange => set giá trị url mới cho name  
   // => value mới => imageUrl thay đổi
   return (
      <FormGroup>
         {label && <Label for={name}>{label}</Label>}
         <RandomPhoto
            name={name}
            imageUrl={value}
            onImageUrlChange={handleImageUrlChange}
            onRandomButtonBlur={onBlur}

         />
         <div className={showError ? 'is-invalid' : ''}></div>
         <ErrorMessage name={name} component={FormFeedback} />

      </FormGroup>
   )
}

export default RandomPhotoField;
