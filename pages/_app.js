import { Provider } from 'react-redux';
import NextNProgress from 'nextjs-progressbar';
import store from '../redux/store';
import '../styles/reset.css';
import '../styles/global.css';

// TODO copy bildirimi bozuk

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
