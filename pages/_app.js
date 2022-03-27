import '../styles/index.css';
import NextNProgress from 'nextjs-progressbar';

const MyApp = ({ Component, pageProps }) => {
    return (<>
        <NextNProgress color={'#ffffff'} height={4} />
        <Component {...pageProps} />
    </>);
};

export default MyApp;
