import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './slices/notification';

const store = configureStore({
	reducer: {
		notification: notificationReducer
	}
});

export default store;