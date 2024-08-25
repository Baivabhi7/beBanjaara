import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as api from "../api";


export const createTour = createAsyncThunk(
    "tour/createTour",
     async({updatedTourData, navigate, toast}, {rejectWithValue})=>{
    try{
     const response = await api.createTour(updatedTourData);
     toast.success("Tour added Successfully");
     navigate("/");
     return response.data;  
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

export const getTours = createAsyncThunk(
    "tour/getTours",
     async(_, {rejectWithValue})=>{
    try{
     const response = await api.getTours();
     return response.data;  
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});

export const getTour = createAsyncThunk(
    "tour/getTour",
     async(id, {rejectWithValue})=>{
    try{
     const response = await api.getTour(id);
     return response.data;  
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});


export const getToursByUser = createAsyncThunk(
    "tour/getToursByUser",
     async(userId, {rejectWithValue})=>{
    try{
     const response = await api.getTours(userId);
     return response.data;  
    }catch(err){
        return rejectWithValue(err.response.data);
    }
});


export const deleteTour = createAsyncThunk(
    "tour/deleteTour",
    async ({ id, toast }, { rejectWithValue }) => {
      try {
        const response = await api.deleteTour(id);
        toast.success("Tour Deleted Successfully");
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    });
  
  export const updateTour = createAsyncThunk(
    "tour/updateTour",
    async ({ id, updatedTourData, toast, navigate }, { rejectWithValue }) => {
      try {
        const response = await api.updateTour(updatedTourData, id);
        toast.success("Tour Updated Successfully");
        navigate("/");
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    });
  
  export const searchTours = createAsyncThunk(
    "tour/searchTours",
    async (searchQuery, { rejectWithValue }) => {
      try {
        const response = await api.getToursBySearch(searchQuery);
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    });

    export const likeTour = createAsyncThunk(
        "tour/likeTour",
        async ({ _id }, { rejectWithValue }) => {
          try {
            const response = await api.likeTour(_id);
            return response.data;
          } catch (err) {
            return rejectWithValue(err.response.data);
          }
        });
      
  
//   export const getToursByTag = createAsyncThunk(
//     "tour/getToursByTag",
//     async (tag, { rejectWithValue }) => {
//       try {
//         const response = await api.getTagTours(tag);
//         return response.data;
//       } catch (err) {
//         return rejectWithValue(err.response.data);
//       }
//     });
  
  // export const getRelatedTours = createAsyncThunk(
  //   "tour/getRelatedTours",
  //   async (tags, { rejectWithValue }) => {
  //     try {
  //       const response = await api.getRelatedTours(tags);
  //       return response.data;
  //     } catch (err) {
  //       return rejectWithValue(err.response.data);
  //     }
  //   });




const tourSlice = createSlice({
    name: "tour",
    initialState: {
        tour: {},
        tours: [],
        userTours: [],
        currentPage: 1,
        numberOfPages: null,
        error: "",
        loading: false,
        },
        reducers:{
            setCurrentPage: (state, action) => {
                state.currentPage = action.payload;
              },  
        },
    
       
       extraReducers: (builder)=>{
        builder
        .addCase(createTour.pending, (state)=>{
            state.loading = true;
        })
        .addCase(createTour.fulfilled, (state, action)=>{
            state.loading = false;
           state.tours = [...state.tours, action.payload];
        })
        .addCase(createTour.rejected, (state, action)=>{
             state.loading = false;
             state.error = action.payload.message;
        })
        .addCase(getTours.pending, (state)=>{
            state.loading = true;
        })
        .addCase(getTours.fulfilled, (state, action)=>{
            state.loading = false;
           state.tours = action.payload;
        })
        .addCase(getTours.rejected, (state, action)=>{
             state.loading = false;
             state.error = action.payload.message;
        })
        .addCase(getTour.pending, (state)=>{
            state.loading = true;
        })
        .addCase(getTour.fulfilled, (state, action)=>{
            state.loading = false;
           state.tour = action.payload;
        })
        .addCase(getTour.rejected, (state, action)=>{
             state.loading = false;
             state.error = action.payload.message;
        })
        .addCase(getToursByUser.pending, (state)=>{
            state.loading = true;
        })
        .addCase(getToursByUser.fulfilled, (state, action)=>{
            state.loading = false;
           state.userTours = action.payload;
        })
        .addCase(getToursByUser.rejected, (state, action)=>{
             state.loading = false;
             state.error = action.payload?.message;
        })
        .addCase(deleteTour.pending, (state)=>{
            state.loading = true;
        })
        .addCase(deleteTour.fulfilled, (state, action)=>{
            state.loading = false;
            const {
                arg: { id },
              } = action.meta;
              if (id) {
                state.userTours = state.userTours.filter((item) => item._id !== id);
                state.tours = state.tours.filter((item) => item._id !== id);
              }
        })
        .addCase(deleteTour.rejected, (state, action)=>{
             state.loading = false;
             state.error = action.payload?.message;
        })
        .addCase(updateTour.pending, (state)=>{
            state.loading = true;
        })
        .addCase(updateTour.fulfilled, (state, action)=>{
            state.loading = false;
            const {
                arg: { id },
              } = action.meta;
              if (id) {
                state.userTours = state.userTours.map((item) =>
                  item._id === id ? action.payload : item
                );
                state.tours = state.tours.map((item) =>
                  item._id === id ? action.payload : item
                );
              }
        })
        .addCase(updateTour.rejected, (state, action)=>{
             state.loading = false;
             state.error = action.payload?.message;
        })
        .addCase(likeTour.pending, (state, action)=>{
                   state.loading = true;
        })
        .addCase(likeTour.fulfilled, (state, action)=>{
            state.loading = false;
            const {
                arg: { _id },
              } = action.meta;
              if (_id) {
                state.tours = state.tours.map((item) =>
                  item._id === _id ? action.payload : item
                );
              }
        })
        .addCase(likeTour.rejected, (state, action)=>{
             state.error = action.payload?.message;
        })
        .addCase(searchTours.pending, (state)=>{
            state.loading = true;
        })
        .addCase(searchTours.fulfilled, (state, action)=>{
            state.loading = false;
           state.tours = action.payload;
        })
        .addCase(searchTours.rejected, (state, action)=>{
             state.loading = false;
             state.error = action.payload?.message;
        })
        // .addCase(getRelatedTours.pending, (state)=>{
        //     state.loading = true;
        // })
        // .addCase(getRelatedTours.fulfilled, (state, action)=>{
        //     state.loading = false;
        //    state.relatedTours = action.payload;
        // })
        // .addCase(getRelatedTours.rejected, (state, action)=>{
        //      state.loading = false;
        //      state.error = action.payload.message;
        // })
    },
});

export const { setCurrentPage } = tourSlice.actions;


export default tourSlice.reducer;