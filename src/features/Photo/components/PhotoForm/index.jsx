import { PHOTO_CATEGORY_OPTIONS } from 'constants/global';
import Images from 'constants/images';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup, Label } from 'reactstrap';
import { Formik, Form, FastField } from 'formik'
import InputField from '../../../../custom-fields/InputField/index.jsx';
import SelectField from '../../../../custom-fields/SelectField/index.jsx';
import RandomPhotoField from '../../../../custom-fields/RandomPhotoField/index.jsx';
import * as Yup from 'yup'
import Spinner from 'reactstrap/lib/Spinner';

PhotoForm.propTypes = {
   onSubmit: PropTypes.func,
};

PhotoForm.defaultProps = {
   onSubmit: null,
}

function PhotoForm(props) {
   // npm i --save react-select
   //code
   /*  Add Part 
   const initialValues = {
      k xài undefined
      title: '',
      categoryId: null, // => nullable
      photo: ''
   }
   */

   const { initialValues, isAddMode } = props; // Edit Part

   // Form Vale is Obj => object()
   const validationSchema = Yup.object().shape({
      title: Yup.string().required('Title is required'),

      categoryId: Yup.number().required('Category is required').nullable(),

      // photo: Yup.string().required('Photo is required'),
      photo: Yup.string().when('categoryId', {
         is: 1,
         then: Yup.string().required('Photo is required'),
         otherwise: Yup.string().notRequired(),
         // Khi chọn category là Technology thì mới required
      })

   })
   return (
      <Formik
         initialValues={initialValues}
         validationSchema={validationSchema}
         onSubmit={props.onSubmit}
      >
         {formikProps => {
            //code
            const { values, errors, touched, isSubmitting } = formikProps
            console.log({ values, errors, touched })
            return (
               <Form>
                  {/*
                  FastField tương ứng với
                  <FormGroup>
                     <Label for="titleId">Title</Label>
                     <Input name="title" id="titleId" placeholder="Eg: Wow nature ..." />
                  </FormGroup> 
                  */}
                  <FastField
                     // Tên Component
                     name="title"
                     // Tên Custom Field
                     component={InputField}
                     // Props cho Custom Field
                     //--------------------------
                     placeholder="Input Field..."
                     label="Title"
                  />


                  {/* 
                  <FormGroup>
                     <Label for="categoryId">Category</Label>
                     <Select
                        id="categoryId"
                        name="categoryId"

                        placeholder="What's your photo category?"
                        options={PHOTO_CATEGORY_OPTIONS}
                     />
                  </FormGroup> 
                  */}

                  <FastField
                     name="categoryId"
                     component={SelectField}
                     //--------------------------------------
                     placeholder="Select Field..."
                     label="Category"
                     options={PHOTO_CATEGORY_OPTIONS}
                  />

                  {
                  /* <FormGroup>
                     <Label for="categoryId">Photo</Label>

                     <div><Button type="button" outline color="primary">Random a photo</Button></div>
                     <div>
                        <img width="200px" height="200px" src={Images.COLORFUL_BG} alt="colorful background" />
                     </div>
                  </FormGroup>
                  */}
                  <FastField
                     name="photo"
                     component={RandomPhotoField}
                     //--------------------------
                     label="Photo"
                  />

                  <FormGroup>
                     <Button type="submit" color={isAddMode ? "primary" : "success"}
                        onSubmit={props.onSubmit}
                     >
                        {isSubmitting && <Spinner size="sm" />}
                        {isAddMode ? <span>Add to album</span> : <span>Update in album</span>}
                     </Button>
                  </FormGroup>
               </Form>
            )
         }}
      </Formik>
   );
}

export default PhotoForm;