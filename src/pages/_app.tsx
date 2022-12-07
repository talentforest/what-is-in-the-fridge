import 'styles/globals.css';
import Layout from 'src/layout/layout';
import { config } from '@fortawesome/fontawesome-svg-core';
import type { AppProps } from 'next/app';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
config.autoAddCss = false;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};

export default App;
