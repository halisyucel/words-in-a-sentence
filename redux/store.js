import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './slices/notification';
import configReducer from './slices/config';

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		config: configReducer,
	}
});

export default store;