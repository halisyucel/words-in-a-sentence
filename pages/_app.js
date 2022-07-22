import store from '../redux/store';
import '../styles/global.css';
import '../styles/reset.css';
import NextNProgress from 'nextjs-progressbar';
import { Provider } from 'react-redux';

const MyApp = ({ Component, pageProps }) => {
	// noinspection JSValidateTypes, RequiredAttributes
	return (
		<Provider store={store}>
			<NextNProgress color={'#ffffff'} height={4} />
			<Component {...pageProps} />
		</Provider>
	);
};

export default MyApp;
