import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	token: null,
	components: {
		tureng: {
			index: 1,
			name: 'tureng',
			text: 'tureng.com',
			visible: true,
		},
		vip: {
			index: 2,
			name: 'vip',
			text: 'vipingilizce.net',
			visible: true,
		},
		merriamwebster: {
			index: 3,
			name: 'merriamwebster',
			text: 'merriam-webster.com',
			visible: true,
		},
		yourdictionary: {
			index: 4,
			name: 'yourdictionary',
			text: 'yourdictionary.com',
			visible: true,
		}
	},
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setComponentIndex: (state, action) => {
			state.components[action.payload.dragItemName].index = action.payload.dragItemIndex;
			state.components[action.payload.hoverItemName].index = action.payload.hoverItemIndex;
		},
		setComponentVisibility: (state, action) => {
			state.components[action.payload.name].visible = action.payload.visible;
		},
		setComponentsFromLocalStorage: (state, action) => {
			for (const componentName of Object.keys(action.payload)) {
				state.components[componentName] = action.payload[componentName];	
			}
		},
		setToken: (state, action) => {
			state.token = action.payload;
		},
	},
});

export const {
	setComponentIndex,
	setComponentVisibility,
	setComponentsFromLocalStorage,
	setToken,
} = settingsSlice.actions;

export default settingsSlice.reducer;
