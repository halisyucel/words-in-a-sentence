import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	type: 'success',
	text: '',
	visible: false,
};

export const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setNotification: (state, action) => {
			state.type = action.payload.type;
			state.text = action.payload.text;
			state.visible = action.payload.visible;
		},
	},
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;