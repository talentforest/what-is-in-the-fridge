import '../styles/globals.css';
import '../styles/emojiVar.css';
import type { AppProps } from 'next/app';
import Layout from '../layout/layout';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
