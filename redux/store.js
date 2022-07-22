import notificationReducer from './slices/notification';
import settingsReducer from './slices/settings';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		settings: settingsReducer,
	},
});

export default store;
