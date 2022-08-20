const { createSlice } = require("@reduxjs/toolkit");

const photo = createSlice({
   name: "photos",
   initialState: [],
   reducers: {
      addPhoto: (state, action) => {
         state.push(action.payload) // k cần return
      },
      removePhoto: (state, action) => {
         const removePhotoId = action.payload
         const newState = state.filter(photo => photo.id !== removePhotoId)
         return newState
      },
      updatePhoto: (state, action) => {
         const newPhoto = action.payload
         const photoIndex = state.findIndex(photo => photo.id === newPhoto.id) // found => >=0; not found => -1
         if (photoIndex !== -1) {
            state[photoIndex] = newPhoto
         }
      }
   }
});

const { reducer, actions } = photo

export const { addPhoto, removePhoto, updatePhoto } = actions
export default reducer