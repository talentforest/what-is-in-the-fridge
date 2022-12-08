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

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DndProvider>
    </Provider>
  );
};

export default App;
