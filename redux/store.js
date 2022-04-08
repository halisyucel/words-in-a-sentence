import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './slices/notification';
import settingsReducer from './slices/settings';

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		settings: settingsReducer,
	}
});

export default store;