import 'styles/globals.css';
import Layout from 'src/layout/layout';
import { config } from '@fortawesome/fontawesome-svg-core';
import type { AppProps } from 'next/app';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
