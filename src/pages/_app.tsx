import 'styles/globals.css';
import Layout from 'src/layout/layout';
import { config } from '@fortawesome/fontawesome-svg-core';
import type { AppProps } from 'next/app';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
config.autoAddCss = false;
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import localFont from '@next/font/local';

const myFont = localFont({ src: './NanumSquareRoundB.ttf' });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <main className={myFont.className}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </DndProvider>
    </Provider>
  );
};

export default App;
