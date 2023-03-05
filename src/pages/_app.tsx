import 'styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
config.autoAddCss = false;
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import localFont from '@next/font/local';
import Navigation from 'src/components/common/Navigation';

const myFont = localFont({
  src: [
    {
      path: './NanumSquareRoundR.ttf',
      weight: '400',
      style: 'thin',
    },
    {
      path: './NanumSquareRoundB.ttf',
      weight: '500',
      style: 'regular',
    },
    {
      path: './NanumSquareRoundEB.ttf',
      weight: '700',
      style: 'bold',
    },
  ],
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <main className={myFont.className}>
          <Navigation />
          <Component {...pageProps} />
        </main>
      </DndProvider>
    </Provider>
  );
};

export default App;
