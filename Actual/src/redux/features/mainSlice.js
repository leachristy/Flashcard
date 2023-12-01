import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  formData: [
    {
      title: "set 55",
      description: "set 55 description",
      numberValue: 1,
      fields: [
        {
          termField: "dummy term field1",
          defField: "dummy def field1",
        },
        {
          termField: "dummy term field2",
          defField: "dummy def field2",
        },
      ],
    },
  ],
};
const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.formData = [...state.formData, action.payload];
    },
  },
});
export const { addData } = mainSlice.actions;
export default mainSlice.reducer;
