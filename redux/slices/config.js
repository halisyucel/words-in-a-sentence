import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	token: null,
	autoCopy: {
		enabled: true,
	},
	components: {
		tureng: {
			index: 1,
			name: 'tureng',
			visible: true,
			active: false,
		},
		vip: {
			index: 2,
			name: 'vip',
			visible: true,
			active: false,
		},
		yourdictionary: {
			index: 3,
			name: 'yourdictionary',
			visible: true,
			active: false,
		}
	},
};

export const configSlice = createSlice({
	name: 'config',
	initialState,
	reducers: {
		setConfig: (state, action) => {
			state = action.payload;
		},
		setToken: (state, action) => {
			state.token = action.payload;
		}
	},
});

export const { setConfig, setToken } = configSlice.actions;

export default configSlice.reducer;