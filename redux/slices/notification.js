import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setNotification: (state, action) => {
			if (state.hasOwnProperty(action.payload.id)) {
				state[action.payload.id] = {
					type: action.payload.type || state[action.payload.id].type,
					text: action.payload.text || state[action.payload.id].text,
					visible: action.payload.visible,
					position: action.payload.position || state[action.payload.id].position,
					button: action.payload.button || state[action.payload.id].button,
					buttonText: action.payload.buttonText || state[action.payload.id].buttonText,
					buttonHref: action.payload.buttonHref || state[action.payload.id].buttonHref
				};
			} else {
				state[action.payload.id] = {
					type: action.payload.type || 'info',
					text: action.payload.text || '',
					visible: action.payload.visible,
					position: action.payload.position || 'bottomCenter',
					button: action.payload.button || false,
					buttonText: action.payload.buttonText || '',
					buttonHref: action.payload.buttonHref || null,
				};
			}
		}
	},
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;