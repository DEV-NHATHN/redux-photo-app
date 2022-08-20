import Banner from 'components/Banner';
import PhotoForm from 'features/Photo/components/PhotoForm';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import { addPhoto, updatePhoto } from 'features/Photo/photoSlice'
import { useHistory, useParams } from 'react-router-dom';
import { randomNumber } from 'utils/common';

AddEditPage.propTypes = {};

function AddEditPage(props) {
   const dispatch = useDispatch()
   const history = useHistory()
   // Edit page
   const { photoId } = useParams()
   const isAddMode = !photoId
   // Get photo
   const editPhoto = useSelector(state => state.photos.find(photo => photo.id === +photoId))
   const initialValues = isAddMode ? {
      title: '',
      categoryId: null,
      photo: ''
   } : editPhoto

   const handleSubmit = (values) => {
      return new Promise(resolve => {
         setTimeout(() => {
            if (isAddMode) {
               const newPhoto = {
                  ...values,
                  id: randomNumber(10000, 99999),
               }
               const action = addPhoto(newPhoto);
               dispatch(action)
            } else {
               const action = updatePhoto(values)
               dispatch(action)
            }
            history.push('/photos')
            resolve(true)
         }, 2000)
      })
   }

   return (
      <div className="photo-edit">
         <Banner title="Pick your amazing photo 😎" />

         <div className="photo-edit__form">
            <PhotoForm
               initialValues={initialValues}
               onSubmit={handleSubmit}
               isAddMode={isAddMode}
            />
         </div>
      </div>
   );
}

export default AddEditPage;