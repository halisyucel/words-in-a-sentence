import '../styles/index.css';
import NextNProgress from 'nextjs-progressbar';
import { Provider } from 'react-redux';
import store from '../redux/store';

const MyApp = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <NextNProgress color={'#ffffff'} height={4} />
            <Component {...pageProps} />
        </Provider>
    );
};

export default MyApp;
